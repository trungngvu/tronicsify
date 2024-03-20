import Link from "next/link";
import { useState } from "react";
import AccoridanProduct from "./AccoridanProduct";
import BreadCrumb from "./BreadCrumb";
import Infos from "./productInfos";
import Specs from "./productInfos/specs";
import MainSwiper from "./MainSwiper";
import Reviews from "./reviews/Reviews";
import SimilarSwiper from "./SimilarSwiper";

const ProductPage = ({ product }: any) => {

  return (
    <div className="w-full h-auto px-3 mb-6 bg-white md:px-2">
      <BreadCrumb
        category={product.category}
        subCategories={product?.subCategories}
      />
      <div className="grid gap-4 grid-row-8 md:grid-cols-8">
        <MainSwiper images={product.imgs} />
        <Infos product={product} />
        {/* <InfosShipping product={product} /> */}
      </div>
      <Specs product={product} />


      <div className="w-full p-2 mx-auto mt-2 border rounded-lg md:w-4/5">
        <SimilarSwiper />
      </div>
      <Reviews product={product} />
    </div>
  );
};

export default ProductPage;
