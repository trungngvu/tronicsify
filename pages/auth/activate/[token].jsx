import jwt from "jsonwebtoken";
import User from "@/models/User";
import Image from "next/image";

const Activate = () => {
  return (
    <main className="w-full h-[65vh] bg-slate-100 flex flex-col items-center justify-center">
      <div className="text-xl font-bold text-center">
        Kích hoạt tài khoản thành công. <br />
        Hãy đăng nhập tài khoản để sử dụng hệ thống
      </div>
      <Image
        src="/assets/images/mail.png"
        width={200}
        alt="mail"
        height={200}
        className="rounded-xl"
      />
    </main>
  );
};

export default Activate;

export const getServerSideProps = async (context) => {
  const { query } = context;

  const token = query.token;
  const user_id = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET);
  await User.updateOne({ _id: user_id.id }, { emailVerified: true });

  return {
    props: {
      userId: user_id.id,
    },
  };
};
