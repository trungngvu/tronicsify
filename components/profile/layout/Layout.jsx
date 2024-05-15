import Header from "@/components/Header/Header";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ user, tab, title, children }) => {
  // console.log(session);
  return (
    <>
      <Header title={title} />
      <main className="grid grid-cols-4 gap-8 pt-5 pb-8 mx-auto bg-gray-100 max-w-screen-2xl md:px-14">
        <section className="col-span-1 p-2 bg-white border md:p-5 rounded-xl">
          <Sidebar
            data={{
              ...user,
              tab,
            }}
          />
        </section>
        <section className="col-span-3 p-2 bg-white border md:p-5 rounded-xl">
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
