import { categoryName } from "@/utils/array_utils";
import { useState, useEffect } from "react";
import axios from "axios";

import BreadCrumb from "./BreadCrumb";
import Infos from "./productInfos";
import Specs from "./productInfos/specs";
import MainSwiper from "./MainSwiper";
import Reviews from "./reviews/Reviews";
import SimilarSwiper from "@/components/ProductPage/SimilarSwiper";

const ProductPage = ({ product }) => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    axios
      .post("/api/ai/similar-products", { q: product.title })
      .then(({ data }) => setResponse(data))
      .catch((e) => console.log(e));
  }, []);
  console.log(response);

  return (
    <div className="w-full h-auto px-3 mb-6 bg-white md:px-2">
      <BreadCrumb
        category={{
          name: categoryName(product.category),
          slug: product.category,
        }}
        subCategories={[
          {
            name: categoryName(product?.sub_category),
            slug: product?.sub_category,
          },
        ]}
      />
      <div className="grid gap-4 grid-row-8 md:grid-cols-8">
        <MainSwiper images={product.imgs} />
        <Infos product={product} />
      </div>
      <Specs product={product} />
      {response.length > 0 && (
        <div className="p-3 py-7">
          <SimilarSwiper title="Sản phẩm tương tự" products={response} />
        </div>
      )}

      <Reviews product={product} />
    </div>
  );
};

export default ProductPage;
