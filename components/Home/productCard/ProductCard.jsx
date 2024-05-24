import Link from "next/link";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";

import { updateCartInDatabase, addProductToCart } from "@/utils/cart";
import ProductSwiper from "./ProductSwiper";
import { CheckIcon } from "@heroicons/react/24/solid";
import { HeartIcon, WrenchIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  const { carts, activeCartId } = useAppSelector((state) => state.cart);
  const images = product?.imgs;
  if (images && images.length === 0)
    images.push(
      `/assets/images/generic/${product?.category}${
        product?.sub_category ? product?.sub_category : ""
      }.jpg`
    );
  const price = product?.price;
  const dispatch = useDispatch();
  const cart = carts.find((c) => c._id === activeCartId)?.products || [];

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!!cart?.find((item) => item._id === product._id)) {
      const newCart = cart.filter((item) => item._id !== product._id);
      dispatch(updateCart(newCart));
    } else if (
      !!cart?.find((item) => item.category === product.category) &&
      product.category !== "disk" &&
      product.category !== "ram"
    ) {
      const newCart = cart.filter((item) => item.category !== product.category);
      newCart.push(product);
      dispatch(updateCartInDatabase(activeCartId, newCart));
    } else {
      dispatch(addProductToCart(activeCartId, product));
    }
  };

  return (
    <div className="flex flex-col relative w-[215px] rounded p-1">
      <Link href={`/product/${product.slug}`} className="relative">
        <ProductSwiper images={images} />
        <div className="absolute z-10 right-1 bottom-1">
          <div className="flex flex-row gap-2">
            <button className="flex items-center p-2 space-x-2 duration-500 ease-in-out rounded hover:text-red-500 transition-200 text-slate-500 bg-opacity-10 bg-amazon-blue_light max-md:mt-3">
              <HeartIcon className="fill-current w-7 h-7 " />
            </button>
            {(product.cpu ||
              product.gpu ||
              (product.socket && product.size && product.ram) ||
              (product.ram && product.capacity) ||
              product.wattage ||
              (product.capacity && product.category === "disk") ||
              product.category === "cooler" ||
              (product.size && product.category === "case")) && (
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
