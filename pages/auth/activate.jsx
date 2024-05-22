import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Image from "next/image";
import { getSession } from "next-auth/react";
import User from "@/models/User";

const Activate = () => {
  return (
    <>
      <Header />
      <main className="w-full h-[65vh] bg-slate-100 flex flex-col items-center justify-center">
        <div className="text-xl font-bold">
          Hãy kiểm tra thư kích hoạt trong email của bạn
        </div>
        <Image
          src="/assets/images/mail.png"
          width={200}
          alt="mail"
          height={200}
          className="rounded-xl"
        />
      </main>
      <Footer />
    </>
  );
};

export default Activate;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const existingUser = await User.findOne({ email: session.user.email });

    if (session.user.emailVerified) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  }

  return {
    props: {},
  };
}
