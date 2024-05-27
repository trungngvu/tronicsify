import Layout from "@/components/profile/layout/Layout";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import User from "@/models/User";
import Product from "@/models/Product";
import ProductCard from "@/components/Home/productCard/ProductCard";

const Profile = ({ user, tab, wishlist }) => {
  const products = wishlist.map((prod) => prod.product);
  return (
    <Layout user={user} tab={tab}>
      <div className="justify-center text-center">
        <h2 className="mb-6 text-4xl font-bold">Danh sách yêu thích</h2>
        <div className="flex flex-col content-start justify-center col-span-5 md:col-span-4">
          <div className="flex flex-wrap items-start justify-center gap-4 mt-6">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  await db.connectDb();
  const { query } = context;
  const session = await getSession(context);
  const user = session?.user;
  const tab = query.tab || 0;

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  let wishlist = [];
  try {
    const user = await User.findById(session?.user.id).populate(
      "wishlist.product"
    );
    await db.disconnectDb();
    wishlist = user.wishlist;
  } catch (error) {
    await db.disconnectDb();
    console.log(error);
  }
  return {
    props: {
      user,
      tab,
      wishlist: JSON.parse(JSON.stringify(wishlist)),
    },
  };
}
