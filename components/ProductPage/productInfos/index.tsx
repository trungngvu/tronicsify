import { Rating } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  HeartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, updateCart } from "../../../redux/slices/CartSlice";
import { useSession, signIn } from "next-auth/react";
import { showDialog } from "@/redux/slices/DialogSlice";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Infos = ({ product }: any) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { cartItems: cart } = useAppSelector((state: any) => state.cart);

  const addToCartHandler = async () => {
    setLoading(true);
    if (!router.query.size) {
      setError("Please Select a size");
      setLoading(false);
      return;
    }
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
    );

    if (qty > data.quantity) {
      setError(
        "the Quantity you have choosed is more than in stock. Try lower the Qty"
      );
      setLoading(false);
    } else if (data.quantity < 1) {
      setError("this Product is out of stock!");
      setLoading(false);
      return;
    } else {
      let _uid = `${product._id}_${product.style}_${router.query.size}`;
      let exist = cart.find((p: any) => p._uid === _uid);
      if (exist) {
        let newCart = cart.map((p: any) => {
          if (p._uid == exist._uid) {
            return { ...p, qty: qty };
          }
          return p;
        });
        dispatch(updateCart(newCart));
        setError("");
        setLoading(false);
      } else {
        dispatch(addToCart({ ...data, qty, size: data.size, _uid }));
        setError("");
        setLoading(false);
      }
    }
  };

  const handleWishlist = async () => {
    try {
      if (!session) {
        return signIn();
      }
      const { data } = await axios.put("/api/user/wishlist", {
        product_id: product._id,
      });
      dispatch(
        showDialog({
          header: "Thành công",
          msgs: [
            {
              msg: data.message,
              type: "success",
            },
          ],
        })
      );
    } catch (error: any) {
      dispatch(
        showDialog({
          header: "Lỗi",
          msgs: [
            {
              msg: error.response.data.message,
              type: "error",
            },
          ],
        })
      );
    }
  };

  const updateAt = new Date(product.updatedAt);

  return (
    <div className="flex flex-col row-span-3 mb-4 md:col-span-3 max-md:px-2">
      <h1 className="text-2xl font-bold ">{product.title}</h1>
      <div className="flex items-center ">
        <span className="mr-3 text-sm cursor-pointer hover:underline text-slate-600">
          Hãng sản xuất: <span className="uppercase">{product.brand}</span>
        </span>
        <Rating
          name="half-rating-read"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
          style={{ color: "#FACF19" }}
        />
        <span className="text-slate-500">
          ({product.numberReviews > 0 ? product.numberReviews : 0} lượt đánh
          giá)
        </span>
      </div>
      <div className="flex w-full bg-slate-200 h-[1px]" />

      <div>
        <span
          className={`mt-1 text-xl ${
            product.availability ? "text-green-500" : "text-red-600"
          }`}
        >
          {product.availability ? "Còn hàng" : "Hết hàng"}
        </span>
        {"\t"}
        <span className="text-slate-400">
          Cập nhật lần cuối: {updateAt.toLocaleDateString()}
        </span>
      </div>

      {product.short_specs && (
        <div className="my-5">
          <div className="font-bold">Tổng quan sản phẩm</div>
          <div
            className="mt-3 text-sm "
            dangerouslySetInnerHTML={{ __html: product.short_specs }}
          />
        </div>
      )}

      <div className="flex flex-row justify-between p-5 my-5 border border-dashed border-1">
        <div className="text-xl font-extrabold text-yellow-600">
          {product.price.toLocaleString()}₫
        </div>
        {product.warranty && (
          <div className="p-1 bg-slate-100">Bảo hành: {product.warranty}</div>
        )}
      </div>

      <div className="flex flex-col mt-2 md:flex-row md:space-x-3">
        <Link
          className="flex items-center justify-center flex-grow p-2 space-x-2 transition duration-300 rounded-full bg-gradient-to-r from-amazon-orange to-yellow-300 text-amazon-blue_dark hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-500 hover:shadow-md"
          href={product.url}
          target="_blank"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="w-8 h-8" />
              <span className="text-xl font-semibold">Loading...</span>
            </>
          ) : (
            <>
              <ShoppingBagIcon className="w-8 h-8" />
              <span className="text-xl font-semibold uppercase ">
                Chuyển đến trang sản phẩm
              </span>
            </>
          )}
        </Link>
        <button
          onClick={() => handleWishlist()}
          className="flex items-center p-2 space-x-2 transition duration-500 ease-in-out rounded bg-slate-200 text-amazon-blue_light hover:bg-amazon-blue_light hover:text-slate-100 max-md:mt-3"
        >
          <HeartIcon className="w-8 h-8" />
          <span>Yêu thích</span>
        </button>
      </div>
      <div className="m-2">
        {error && (
          <span className="mt-2 font-semibold text-red-500">{error}</span>
        )}
      </div>
    </div>
  );
};

export default Infos;
