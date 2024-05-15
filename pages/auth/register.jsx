import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import RegisterPage from "@/components/User/RegisterPage";

import { getProviders } from "next-auth/react";

const Register = ({ providers }) => {
  providers = Object.values(providers);
  return (
    <>
      <Header />
      <main className="w-full h-auto bg-slate-100">
        <RegisterPage providers={providers} />
      </main>
      <Footer />
      <MenuSideBar />
    </>
  );
};

export default Register;

export const getServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
