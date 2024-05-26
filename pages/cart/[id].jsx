import Cart from "@/models/Cart";
import db from "@/utils/db";
import Image from "next/image";
import View from "@/components/CartPage/View";
import Checkout from "@/components/CartPage/Checkout";
import { Avatar } from "@mui/material";
import ConstrainCheck from "@/components/CartPage/ConstrainCheck";
import Footer from "@/components/Footer";

const Sharing = ({ cart }) => {
  return (
    <main
      className={`min-h-screen bg-slate-100 flex flex-col ${
        (cart === "401" || cart === "404") && "overflow-hidden bg-white"
      }`}
    >
      {cart === "404" && (
        <div className="flex flex-col items-center justify-center w-full h-full grow">
          <div className="px-5 text-2xl font-bold text-center">
            Cấu hình bạn đang tìm không tồn tại!
          </div>
          <Image
            src="/assets/images/404.png"
            alt="404"
            width={400}
            height={100}
          />
        </div>
      )}
      {cart === "401" && (
        <div className="flex flex-col items-center justify-center w-full h-full grow">
          <div className="px-5 text-2xl font-bold text-center">
            Bạn không có quyền truy cập cấu hình này!
          </div>
          <Image
            src="/assets/images/401.svg"
            alt="404"
            width={400}
            height={100}
          />
        </div>
      )}
      {cart !== "401" && cart !== "404" && (
        <div className="flex flex-col gap-4 px-2 py-8 md:flex-row md:px-8">
          <div className="md:w-3/4">
            <div className="px-4 py-2 bg-white border rounded ">
              <div className="flex items-end justify-between my-2">
                <h2 className="text-3xl font-bold ">Cấu hình máy tính</h2>
                <div className="flex gap-5">
                  <div className="text-slate-600">
                    Ngày tạo:{" "}
                    <span>{new Date(cart.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-slate-600">
                    Lần chỉnh sửa gần nhất:{" "}
                    <span>{new Date(cart.updatedAt).toLocaleDateString()}</span>{" "}
                    <span>{new Date(cart.updatedAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Avatar src={cart.user.image} />
                <span>{cart.user.name}</span>
              </div>
              <div className="w-full bg-slate-200 h-[1px]" />
              {cart.products.map((product, i) => (
                <View key={i} product={product} />
              ))}
            </div>
          </div>
          <div className="md:w-1/4">
            <Checkout cart={cart.products} />
            <ConstrainCheck cart={cart.products} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Sharing;

export async function getServerSideProps(context) {
  const { query } = context;
  const id = query.id;
  await db.connectDb();
  let cart;
  try {
    cart = await Cart.findById(id)
      .populate({
        path: "products",
        populate: [{ path: "cpu" }, { path: "gpu" }],
      })
      .populate("user");
    if (!cart) cart = "404";
    else if (!cart.sharable) cart = "401";
  } catch {
    cart = "404";
  }
  await db.disconnectDb();

  return {
    props: { cart: JSON.parse(JSON.stringify(cart)) },
  };
}
