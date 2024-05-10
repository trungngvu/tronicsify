import db from "@/utils/db";
import { getSession } from "next-auth/react";
import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";

const AIPage = () => {
  // console.log(product);
  return (
    <>
      <Header title="AI Builder" />
      <main className="flex flex-col items-center justify-center w-full gap-10 p-20 bg-slate-200">
        <Image
          src="/assets/images/pc_builder.png"
          alt="pc builder"
          width={416}
          height={73}
        />
        <div>Xây dựng cấu hình máy tính với trí tuệ nhân tạo</div>
        <div className="flex items-center gap-5 px-5 py-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-xl">
          <input className="border-2 rounded-lg w-[400px] border-amazon-orange h-10 focus:outline-none px-3" placeholder="PC chơi Cyberpunk 2077 ở độ phân giải 1080p"/>
          <button className="h-10 px-3 text-white rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600">Build với AI</button>
        </div>
      </main>
      <Footer />
      <MenuSideBar />
    </>
  );
};

export default AIPage;

export async function getServerSideProps(context: any) {
  db.connectDb();
  const { query } = context;
  const session = await getSession(context);
  const user = session?.user;
  const tab = query.tab || 0;

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      user,
      tab,
    },
  };
}
