import CarouselContainer from "@/components/Home/CarouselContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import Product from "@/models/Product";
import HomeProductSwiper from "@/components/Home/HomeProductSwiper";
import CategoriesProduct from "@/components/Home/CategoriesProduct/CategoriesProducts";
import db from "../utils/db";

export default function Home({ products }: any) {
  return (
    <>
      <Header title="Tronicsify" />
      <main className="mx-auto bg-gray-100 max-w-screen-2xl">
        <CarouselContainer />
        <CategoriesProduct products={products} />
        <div className="relative z-10">
          <HomeProductSwiper products={products} category="psu" />
          <HomeProductSwiper products={products} category="cooler" />
        </div>
      </main>
      <Footer />
      <MenuSideBar />
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  db.connectDb();

  const categories = ["cpu", "gpu", "ram", "main", "psu", "cooler"];

  // Use Promise.all() to fetch products for all categories concurrently
  const productPromises = categories.map((category) =>
    Product.find({ category, imgs: { $ne: [] }, availability: true })
      .limit(10)
      .select("title imgs slug category price")
  );

  // Wait for all promises to resolve using Promise.all()
  const get_products = await Promise.all(productPromises);
  const products = get_products.reduce((acc, curr) => acc.concat(curr), []);

  db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};