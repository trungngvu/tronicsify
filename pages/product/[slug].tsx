import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import ProductPage from "@/components/ProductPage/ProductPage";
import db from "@/utils/db";
import Product from "@/models/Product";
import User from "@/models/User";

const SingleProduct = ({ product }: any) => {
  // console.log(product);
  return (
    <>
      <Header title={product.name} />
      <main className="w-full bg-white">
        <ProductPage product={product} />
      </main>
      <Footer />
      <MenuSideBar />
    </>
  );
};

export default SingleProduct;

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  const slug = query.slug;
  db.connectDb();
  let product = await Product.findOne({ slug })
    .populate({ path: "reviews.reviewBy", model: User })
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

  function calculatePercentage(num: any) {
    return (
      (product?.reviews?.reduce((total: any, review: any) => {
        return (
          total +
          (review.rating == Number(num) || review.rating == Number(num) + 0.5)
        );
      }, 0) *
        100) /
      product?.reviews?.length
    ).toFixed(1);
  }

  db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
};
