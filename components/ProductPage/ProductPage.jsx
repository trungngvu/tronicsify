import { categoryName } from "@/utils/array_utils";

import BreadCrumb from "./BreadCrumb";
import Infos from "./productInfos";
import Specs from "./productInfos/specs";
import MainSwiper from "./MainSwiper";
import Reviews from "./reviews/Reviews";

const ProductPage = ({ product }) => {
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

      <Reviews product={product} />
    </div>
  );
};

export default ProductPage;
