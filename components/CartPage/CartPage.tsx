import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Checkout from "./Checkout";
import PaymentMethods from "./PaymentMethods";
import Product from "./Product";
import Category from "./Category";
import { saveCart } from "../../request/users";
import axios from "axios";
import { useAppDispatch } from "@/redux/hooks";
import { useAppSelector } from "@/redux/hooks";
import DotLoaderSpinner from "../loaders/dotLoader/DotLoaderSpinner";

const CartPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const cart = useAppSelector((state: any) => state.cart.cartItems);

  //   useEffect(() => {
  //     if (session) {
  //       const update = async () => {
  //         const { data } = await axios.post(`/api/user/updatecart`, {
  //           products: cart.cartItems,
  //         });
  //         dispatch(updateCart(data));
  //         // console.log("update cart > ", data);
  //       };
  //       if (cart.cartItems.length > 0) {
  //         update();
  //       }
  //     } else {
  //       router.push("/auth/signin");
  //     }
  //   }, []);

  // const saveCartToDbHandler = async () => {
  //   if (session) {
  //     setLoading(true);
  //     const res = await saveCart(selected);
  //     router.push("/checkout");
  //   } else {
  //     router.push("/auth/signin");
  //   }
  // };

  const categories = [
    { title: "Bộ vi xử lý", slug: "cpu" },
    { title: "Card đồ họa", slug: "gpu" },
    { title: "Bo mạch chủ", slug: "main" },
    { title: "RAM", slug: "ram" },
    { title: "Ổ cứng", slug: "disk" },
    { title: "Nguồn máy tính", slug: "psu" },
    { title: "Tản nhiệt", slug: "cooler" },
    { title: "Case máy tính", slug: "case" },
  ];

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className="flex flex-col gap-4 px-2 py-8 md:flex-row md:px-8">
        <div className="md:w-3/4">
          <div className="px-4 py-2 bg-white border rounded ">
            <h2 className="my-2 text-3xl font-bold">Xây dựng cấu hình</h2>
            <div className="w-full bg-slate-200 h-[1px]" />
            {categories.map((category, i) => (
              <Category
                key={i}
                title={category.title}
                slug={category.slug}
                cart={cart}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/4">
          <Checkout
            total={cart?.reduce((acc: any, item: any) => acc + item.price, 0)}
          />
          <PaymentMethods />
        </div>
      </div>
    </>
  );
};

export default CartPage;
