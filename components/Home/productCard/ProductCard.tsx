import Link from "next/link";
import ProductSwiper from "./ProductSwiper";
import { CheckIcon } from "@heroicons/react/24/solid";
import { HeartIcon, WrenchIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }: any) => {
  const images = product?.imgs;
  const price = product?.price;

  const handleCart = (e) => {};

  return (
    <div className="flex flex-col relative w-[215px] rounded p-1">
      <Link href={`/product/${product.slug}`} className="relative">
        <ProductSwiper images={images} />
        <div className="absolute z-10 right-1 bottom-1">
          <div className="flex flex-row gap-2">
            <button className="flex items-center p-2 space-x-2 duration-500 ease-in-out rounded hover:text-red-500 transition-200 text-slate-500 bg-opacity-10 bg-amazon-blue_light max-md:mt-3">
              <HeartIcon className="fill-current w-7 h-7 " />
            </button>
            <button className="flex items-center p-2 space-x-2 duration-500 ease-in-out rounded hover:text-amazon-orange transition-200 text-slate-500 bg-opacity-10 bg-amazon-blue_light max-md:mt-3">
              <WrenchIcon
                className="fill-current w-7 h-7 "
                onClick={handleCart}
              />
            </button>
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
