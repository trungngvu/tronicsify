import Layout from "@/components/profile/layout/Layout";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const Profile = ({ user, tab, orders }) => {
  return (
    <>
      <Layout user={user} tab={tab} title={`Hồ sơ của ${user.name}`}>
        <div className="text-center">
          <h2 className="mb-6 text-4xl font-bold">Hồ sơ của tôi</h2>
        </div>
      </Layout>
    </>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  db.connectDb();
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
  if (!session.user.emailVerified) {
    return {
      redirect: {
        destination: "/auth/activate",
      },
    };
  }

  return {
    props: {
      user,
      tab,
    },
  };
}
