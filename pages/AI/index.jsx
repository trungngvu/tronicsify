import db from "@/utils/db";
import { getSession } from "next-auth/react";
import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { useState } from "react";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import SimilarSwiper from "@/components/ProductPage/SimilarSwiper";

const AIPage = () => {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("api/ai", { q: search });
      setResponse(data);
    } catch {
      setResponse({ res: "error" });
    }
    setLoading(false);
  };

  return (
    <>
      <Header title="AI Builder" />
      <main className="flex flex-col items-center justify-center w-full min-h-[80vh] gap-10 p-20 bg-slate-200">
        <Image
          src="/assets/images/pc_builder.png"
          alt="pc builder"
          width={416}
          height={73}
        />
        <div>Xây dựng cấu hình máy tính với trí tuệ nhân tạo</div>
        <div className="flex flex-col items-center justify-center w-3/4 gap-5 px-5 py-3 rounded-lg lg:w-[50vw] md:flex-row bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
          <input
            className="h-10 px-3 border-2 rounded-lg border-amazon-orange focus:outline-none grow"
            placeholder="PC chơi Cyberpunk 2077 1080p, dựng phim, lập trình,..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleAI();
            }}
          />
          <button
            onClick={handleAI}
            disabled={loading}
            className="flex items-center justify-center h-10 text-white transition-transform transform rounded-lg w-28 bg-gradient-to-r from-purple-600 to-cyan-600 hover:scale-110"
          >
            {loading ? <CircleLoader size={20} color="#FFF" /> : "Build với AI"}
          </button>
        </div>
        {response.res &&
          (response.res === "error" ? (
            <div className="p-5 text-red-500 bg-white rounded">
              Có lỗi xảy ra, hãy kiểm tra lại yêu cầu của bạn. <br />
              Hãy thử những yêu cầu chi tiết: <br />
              &nbsp;&nbsp;&nbsp;• Xây dựng cấu hình chơi tốt tựa game Grand
              Theft Auto V ở độ phân giải 1080P giá rẻ <br />
              &nbsp;&nbsp;&nbsp;• Cấu hình làm phim bom tấn nhiều kỹ xảo phức
              tạp <br />
              &nbsp;&nbsp;&nbsp;• PC văn phòng giá rẻ
            </div>
          ) : (
            <>
              <div
                className="bg-white p-5 rounded max-w-[1000px]"
                dangerouslySetInnerHTML={{ __html: response.res }}
              />
              <div className="w-full p-2 mx-auto mt-2 border rounded-lg md:w-4/5">
                <SimilarSwiper
                  title="Sản phẩm khuyến nghị"
                  products={response.prods}
                />
              </div>
            </>
          ))}
      </main>
      <Footer />
    </>
  );
};

export default AIPage;

export async function getServerSideProps(context) {
  db.connectDb();
  const { query } = context;
  const session = await getSession(context);
  const user = session?.user;
  const tab = query.tab || 0;
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
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
