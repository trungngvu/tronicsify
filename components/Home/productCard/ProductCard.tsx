import Link from "next/link";
import ProductSwiper from "./ProductSwiper";

const ProductCard = ({ product }: any) => {
  const images = product?.imgs;
  const price = product?.price;

  return (
    <div className="flex flex-col relative w-[215px] rounded p-1">
      <Link href={`/product/${product.slug}`}>
        <ProductSwiper images={images} />
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
        <span className="text-red-500 \ ">{price?.toLocaleString()}₫</span>
        <div className="flex mt-1 space-x-2"></div>
      </div>
    </div>
  );
};

export default ProductCard;
