import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";
import bcrypt from "bcrypt";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    const user = await User.findById(req.user);
    const crypted_password = await bcrypt.hash(new_password, 12);
    // if user login with social media
    if (!user.password) {
      await user.updateOne({
        password: crypted_password,
      });
      return res.status(200).json({
        message:
          "Chúng tôi nhận thấy bạn đăng nhập bằng tài khoản bên thứ ba, vì vậy chúng tôi đã cập nhật mật khẩu mới cho bạn.",
      });
    }
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Mật khẩu hiện tại không chính xác!" });
    }

    await user.updateOne({
      password: crypted_password,
    });
    return res.status(200).json({ message: "Đổi mật khẩu mới thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
