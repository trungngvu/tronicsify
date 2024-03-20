import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductSwiper from "./ProductSwiper";

const ProductCard = ({ product }: any) => {
  const images = product?.imgs;
  const price = product?.price;

  return (
    <div className="flex flex-col relative w-[215px] rounded p-1">
      <Link href={`/product/${product.slug}`}>
        <ProductSwiper images={images} />
      </Link>
      <div className="mt-2 ">
        <Link href={`/product/${product.slug}`}>
          <h3>
            {product.title.length > 45
              ? `${product.title.substring(0, 45)}`
              : product.title}
          </h3>
        </Link>
        <span className="text-xs text-red-500">{price}</span>
        <div className="flex mt-1 space-x-2"></div>
      </div>
    </div>
  );
};

export default ProductCard;
