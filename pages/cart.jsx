import Header from "@/components/Header/Header";
import CartPage from "@/components/CartPage/CartPage";
import { useAppSelector } from "@/redux/hooks";
import { getSession } from "next-auth/react";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.cartItems);

  // console.log('cart > ', cart);
  return (
    <>
      <Header />
      <main className="w-full bg-slate-100">
        <CartPage cart={cart} />
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
