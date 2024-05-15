/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const GridCategory = ({ category, products, gridCols }) => {
  const length = gridCols * gridCols;
  const selectedProducts = products
    .filter((product) => category == product.category)
    .slice(0, length);
  return (
    <div className="flex flex-col p-2 bg-white border rounded">
      <h3 className="my-2 font-bold uppercase">{category.replace("-", " ")}</h3>
      <div
        className={`h-full grid grid-cols-${gridCols} gap-4 m-1  items-center`}
      >
        {selectedProducts.map((product) => (
          <Link href={`/product/${product.slug}`} key={product._id}>
            <div
              className={`relative  ${length > 1 ? "h-[200px]" : "h-[420px]"}`}
            >
              <img
                src={product.imgs[0]}
                alt={product.title}
                className="object-cover rounded"
              />
            </div>
            {length > 1 && <h4 className="mt-1 text-xs">{product.title}</h4>}
          </Link>
        ))}
      </div>
      {length > 1 ? (
        <Link
          href={`/browse/${category}`}
          className="my-2 text-xs text-blue-500 cursor-pointer hover:underline"
        >
          Xem thêm
        </Link>
      ) : (
        <Link
          href={`/product/${products[0].slug}`}
          className="my-2 text-xs text-blue-500 cursor-pointer hover:underline"
        >
          Mua ngay
        </Link>
      )}
    </div>
  );
};

export default GridCategory;
