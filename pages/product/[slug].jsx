import ProductPage from "@/components/ProductPage/ProductPage";
import db from "@/utils/db";
import Product from "@/models/Product";
import User from "@/models/User";

const SingleProduct = ({ product }) => {
  return (
    <main className="w-full bg-white">
      <ProductPage product={product} />
    </main>
  );
};

export default SingleProduct;

export const getServerSideProps = async (context) => {
  const { query } = context;
  const slug = query.slug;
  await db.connectDb();
  let product = await Product.findOne({ slug })
    .populate({
      path: "reviews.reviewBy",
      model: User,
    })
    .lean();

  let newProduct = {
    ...product,
    ratings: [
      {
        percentage: calculatePercentage("5"),
      },
      {
        percentage: calculatePercentage("4"),
      },
      {
        percentage: calculatePercentage("3"),
      },
      {
        percentage: calculatePercentage("2"),
      },
      {
        percentage: calculatePercentage("1"),
      },
    ],
  };

  function calculatePercentage(num) {
    return (
      (product?.reviews?.reduce((total, review) => {
        return (
          total +
          (review.rating == Number(num) || review.rating == Number(num) + 0.5)
        );
      }, 0) *
        100) /
      product?.reviews?.length
    ).toFixed(1);
  }

  await db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
};
