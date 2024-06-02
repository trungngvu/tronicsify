import { Rating } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {
  HeartIcon,
  ShoppingBagIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as SolidHeart,
  WrenchIcon as SolidWrench,
} from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addWishToDB, removeWishFromDB } from "@/utils/wish";
import { updateCartInDatabase, addProductToCart } from "@/utils/cart";
import { useSession } from "next-auth/react";
import { showDialog } from "@/redux/slices/DialogSlice";

const Infos = ({ product }) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const wishlist = useAppSelector((state) => state.wish.wishes);
  const { carts, activeCartId } = useAppSelector((state) => state.cart);
  const cart = carts?.find((c) => c._id === activeCartId)?.products || [];

  const included = wishlist.find((prod) => prod.product === product._id);
  const inCart = cart?.find((item) => item._id === product._id);

  const handleWishlist = () => {
    if (included) {
      dispatch(removeWishFromDB(product._id));
    } else dispatch(addWishToDB(product._id));
  };
  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!activeCartId) {
      dispatch(
        showDialog({
          header: "Bạn chưa thêm cấu hình nào",
          msgs: [
            {
              msg: 'Truy cập "Xây dựng cấu hình" để thêm cấu hình mới ngay!',
              type: "error",
            },
          ],
        })
      );
      return;
    }
    if (!!cart?.find((item) => item._id === product._id)) {
      const newCart = cart?.filter((item) => item._id !== product._id);
      dispatch(updateCartInDatabase(activeCartId, newCart));
    } else if (
      !!cart?.find((item) => item.category === product.category) &&
      product.category !== "disk" &&
      product.category !== "ram"
    ) {
      const newCart = cart?.filter(
        (item) => item.category !== product.category
      );
      newCart.push(product);
      dispatch(updateCartInDatabase(activeCartId, newCart));
    } else {
      dispatch(addProductToCart(activeCartId, product));
    }
  };

  const sellers = [
    "phongvu",
    "hacom",
    "hoangha",
    "gearvn",
    "nguyencong",
    "tnc",
  ];

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
        <div className="flex items-center text-xl font-extrabold text-yellow-600">
          <Image
            src={`/assets/images/seller/${sellers.find((seller) =>
              product?.url?.includes(seller)
            )}.png`}
            alt="seller"
            width={80}
            height={20}
            className="mr-3"
          />
          {product.price.toLocaleString()}₫
        </div>
        {product.warranty && product.warranty !== "None" && (
          <div className="p-1 bg-slate-100">Bảo hành: {product.warranty}</div>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-2 ">
        <Link
          className="flex items-center justify-center flex-grow p-2 space-x-2 transition duration-300 rounded-full bg-gradient-to-r from-amazon-orange to-yellow-300 text-amazon-blue_dark hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-500 hover:shadow-md"
          href={product.url}
          target="_blank"
        >
          <ShoppingBagIcon className="w-8 h-8" />
          <span className="text-xl font-semibold uppercase ">
            Chuyển đến trang sản phẩm
          </span>
        </Link>
        {session && (
          <div className="flex gap-3">
            <button
              onClick={handleWishlist}
              className="flex items-center justify-center space-x-2 transition duration-500 ease-in-out rounded grow bg-slate-200 text-amazon-blue_light hover:bg-amazon-blue_light hover:text-slate-100 max-md:mt-3"
            >
              {included ? (
                <SolidHeart className="w-8 h-8 text-red-500" />
              ) : (
                <HeartIcon className="w-8 h-8" />
              )}
              <span>Yêu thích</span>
            </button>
            <button
              onClick={handleCart}
              className="flex items-center justify-center p-2 space-x-2 transition duration-500 ease-in-out rounded grow bg-slate-200 text-amazon-blue_light hover:bg-amazon-blue_light hover:text-slate-100 max-md:mt-3"
            >
              {inCart && product?.buildable ? (
                <SolidWrench className="w-8 h-8 text-amazon-orange" />
              ) : (
                <WrenchIcon className="w-8 h-8" />
              )}
              <span>Chọn linh kiện</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Infos;
