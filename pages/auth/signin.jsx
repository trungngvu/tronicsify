import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import SignInPage from "@/components/User/SignInPage";

import { getProviders, getCsrfToken, getSession } from "next-auth/react";

const SignIn = ({ providers, csrfToken, callbackUrl }) => {
  providers = Object.values(providers);

  return (
    <>
      <Header />
      <main className="w-full h-auto bg-slate-100">
        <SignInPage
          providers={providers}
          csrfToken={csrfToken}
          callbackUrl={callbackUrl}
        />
      </main>
      <Footer />
    </>
  );
};

export default SignIn;

export const getServerSideProps = async (context) => {
  const { req, query } = context;
  const { callbackUrl = null } = query || null;

  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: callbackUrl || "/",
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: {
      providers,
      csrfToken,
      callbackUrl: callbackUrl?.includes("activate") ? "/" : callbackUrl,
    },
  };
};
