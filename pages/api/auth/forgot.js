import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import { passwordResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { passwordResetTemplate } from "../../../emails/passwordResetTemplate";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Vui lòng nhập Email." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Email không tồn tại." });
    }

    const userId = passwordResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${userId}`;
    console.log(url);
    sendEmail(
      email,
      url,
      "",
      "Đặt lại mật khẩu tronicsify.com",
      passwordResetTemplate
    );

    res.send({
      message: "Đường dẫn đổi mật khẩu đã được gửi tới email của bạn.",
    });

    await db.disconnectDb();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default handler;
