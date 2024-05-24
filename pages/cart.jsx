import Header from "@/components/Header/Header";
import CartPage from "@/components/CartPage/CartPage";
import Empty from "@/components/CartPage/Empty";
import { useAppSelector } from "@/redux/hooks";
import { getSession } from "next-auth/react";

const Cart = () => {
  const {carts, activeCartId} = useAppSelector((state) => state.cart);

  console.log("cart > ", carts, activeCartId);
  return (
    <>
      <Header />
      <main className="w-full bg-slate-100">
        {carts.length === 0 ? <Empty /> : <CartPage cart={carts} />}
      </main>
    </>
  );
};

export default Cart;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
    };
  }
  return {
    props: {},
  };
}
