import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import CartPage from "@/components/CartPage/CartPage";
import Empty from "@/components/CartPage/Empty";
import { useAppSelector } from "@/redux/hooks";
import { getSession } from "next-auth/react";

const Cart = () => {
  const cart = useAppSelector((state: any) => state.cart.cartItems);

  // console.log('cart > ', cart);
  return (
    <>
      <Header />
      <main className="w-full bg-slate-100">
        {cart ? <CartPage cart={cart} /> : <Empty />}
      </main>
      <MenuSideBar />
    </>
  );
};

export default Cart;

export async function getServerSideProps(context: any) {
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
