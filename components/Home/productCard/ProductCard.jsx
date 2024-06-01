import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Image from "next/image";

import { updateCartInDatabase, addProductToCart } from "@/utils/cart";
import ProductSwiper from "./ProductSwiper";
import { CheckIcon } from "@heroicons/react/24/solid";
import { HeartIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { showDialog } from "@/redux/slices/DialogSlice";
import { addWishToDB, removeWishFromDB } from "@/utils/wish";

const ProductCard = ({ product }) => {
  const { carts, activeCartId } = useAppSelector((state) => state.cart);
  const wishlist = useAppSelector((state) => state.wish.wishes);
  const dispatch = useAppDispatch();
  const included = wishlist.find((prod) => prod.product === product._id);
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (included) {
      dispatch(removeWishFromDB(product._id));
    } else dispatch(addWishToDB(product._id));
  };
  const { data: session } = useSession();

  const images = product?.imgs;
  if (images && images.length === 0)
    images.push(
      `/assets/images/generic/${product?.category}${
        product?.sub_category ? product?.sub_category : ""
      }.jpg`
    );
  const price = product?.price;
  const cart = carts?.find((c) => c._id === activeCartId)?.products || [];

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

  return (
    <div className="flex flex-col relative w-[215px] rounded p-1">
      <Link href={`/product/${product.slug}`} className="relative">
        <div className="absolute top-0 left-0 z-10 p-2 bg-opacity-30 bg-amazon-blue_light">
          <Image
            src={`/assets/images/seller/${sellers.find((seller) =>
              product?.url.includes(seller)
            )}.png`}
            alt="seller"
            width={80}
            height={20}
          />
        </div>
        <ProductSwiper images={images} />
        {session && (
          <div className="absolute z-10 right-1 bottom-1">
            <div className="flex flex-row gap-2">
              <button
                onClick={handleWishlist}
                className={`flex items-center p-2 space-x-2 duration-500 ease-in-out rounded hover:text-red-500 transition-200 ${
                  included ? "text-red-500" : "text-slate-500"
                } bg-opacity-10 bg-amazon-blue_light max-md:mt-3`}
              >
                <HeartIcon className="fill-current w-7 h-7 " />
              </button>
              {product?.buildable && (
                <button
                  className={`flex items-center p-2 space-x-2 duration-500 ease-in-out rounded ${
                    cart?.find((item) => item._id === product._id)
                      ? "text-amazon-orange"
                      : "text-slate-500"
                  } hover:text-amazon-orange transition-200  bg-opacity-10 bg-amazon-blue_light max-md:mt-3`}
                  onClick={handleCart}
                >
                  <WrenchIcon className="fill-current w-7 h-7 " />
                </button>
              )}
            </div>
          </div>
        )}
      </Link>
      <div className="mt-2 truncate">
        <Link href={`/product/${product.slug}`}>
          <h3
            style={{
              whiteSpace: "normal",
              display: "-webkit-box" /* For webkit browsers */,
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </h3>
        </Link>
        <div>
          <div className="text-lg font-bold text-red-500">
            {price?.toLocaleString()}₫
          </div>
          {product.availability && (
            <div className="flex flex-row text-green-600">
              <CheckIcon className="w-5" /> Sẵn hàng
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
