import {
  ChevronDownIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const AccountButtons = () => {
  const cart = useAppSelector((state: any) => state.cart.cartItems);
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-2 max-md:ml-auto md:space-x-6">
      {/* account Icon in Mobile */}
      <div className=" md:hidden">
        <Link className="flex items-center" href="/auth/signin">
          <p className="text-sm">Sign in</p>
          <ChevronRightIcon className="h-3 " />
          <UserIcon className="h-6" />
        </Link>
      </div>

      <div className="relative hidden p-1 md:inline link show-account">
        <p className="text-xs text-slate-300">
          Chào, {session ? session.user?.name : "đăng nhập ngay"}
        </p>
        <p className="flex text-sm font-bold">
          Trung tâm tài khoản
          <ChevronDownIcon className="self-end h-4 ml-1" />
        </p>

        {/* popOver Account */}
        <div className="absolute z-20 mt-1 bg-white border rounded-sm shadow whitespace-nowrap show-account-popup -right-14">
          <div className="absolute h-3 w-3 bg-white rotate-45 -mt-1 right-[3.85rem] "></div>
          {session ? (
            <div className="flex flex-col items-center justify-between gap-2 p-3 pb-2 border-b">
              <p className="text-xl text-amazon-blue_light">
                Chào,{" "}
                <Link href="/profile">
                  <b>{session.user?.name}</b>
                </Link>
              </p>
              <div className="flex space-x-2">
                <Link href="/profile">
                  <div className="button-orange px-6 py-[0.3rem] text-sm text-gray-900">
                    Hồ sơ
                  </div>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="button-orange px-2 py-[0.3rem] text-sm text-gray-900"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center p-3 pb-2 m-3 border-b">
              <button
                onClick={() => signIn()}
                className="button-orange px-16 py-[0.3rem] text-sm text-gray-900"
              >
                Đăng nhập
              </button>
              <p className="mt-2 text-xs text-gray-900">
                Khách hàng mới?{" "}
                <Link
                  href="/auth/register"
                  className="text-[#05a] hover:text-amazon-orange hover:underline"
                >
                  Đăng ký tại đây
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        <Link href="/cart" className="relative flex items-center link">
          <div className="relative pt-2 pr-2">
            <WrenchScrewdriverIcon className="h-10" />
            <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 font-semibold rounded-full bg-amazon-orange text-amazon-blue_dark">
              {cart?.length}
            </span>
          </div>
          <p className="hidden w-20 mt-2 text-sm font-bold md:inline">
            Xây dựng cấu hình
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AccountButtons;
