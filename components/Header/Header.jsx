import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import Head from "next/head";
import Search from "./Search";

import amazonLogo from "../../public/assets/images/tronicsify.png";
import AccountButtons from "./AccountButtons";
import HeaderBottom from "./HeaderBottom";
import Link from "next/link";

const Header = ({ title }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <div className="flex flex-col bg-amazon-blue_dark md:flex-row">
          <div className="flex items-center flex-grow p-3 text-white md:space-x-5 md:px-4">
            {/* Menu Icon Mobile */}
            <div className="flex items-center justify-center">
              {/* Logo */}
              <Link href="/">
                <Image
                  src={amazonLogo}
                  alt="amazon-logo"
                  className="object-contain w-20 pt-2 md:w-28"
                />
              </Link>
            </div>

            {/* Search Desktop*/}
            <div className="flex-grow hidden md:px-10 md:flex">
              <Search />
            </div>

            <AccountButtons />
          </div>

          {/* Search Mobile*/}
          <div className="md:hidden">
            <Search />
          </div>
        </div>

        <HeaderBottom />
      </header>
    </>
  );
};

export default Header;
