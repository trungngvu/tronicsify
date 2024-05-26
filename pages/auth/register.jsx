import RegisterPage from "@/components/User/RegisterPage";

import { getProviders } from "next-auth/react";

const Register = ({ providers }) => {
  providers = Object.values(providers);
  return (
    <main className="w-full h-auto bg-slate-100">
      <RegisterPage providers={providers} />
    </main>
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
