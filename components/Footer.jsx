import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import amazonLogo from "../public/assets/images/tronicsify.png";
import enFlag from "../public/assets/images/vietnam.jpg";

const Footer = () => {
  return (
    <div className="flex flex-col w-full mx-auto">
      <div
        className="flex bg-[#37475a] hover:bg-[#485769] justify-center cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <p className="py-4 text-xs text-white">Cuộn lên đầu trang</p>
      </div>

      <div className="flex items-center justify-center py-1 max-md:flex-col bg-amazon-blue_light">
        <Image
          src={amazonLogo}
          alt="amazon-log"
          className="object-contain w-20 h-20 md:mr-20"
        />

        <div className="flex items-center space-x-2 max-md:mb-4">
          <div className="flex px-2 py-2 text-xs border rounded cursor-pointer space-around border-slate-400 text-slate-100">
            <GlobeAltIcon className="h-4 mr-3" />
            <span>Tiếng Việt</span>
          </div>
          <div className="flex px-2 py-2 text-xs border rounded cursor-pointer border-slate-400 text-slate-100">
            <span className="mr-3 text-slate-100">$</span>
            <span>VND - Việt Nam Đồng</span>
          </div>
          <div className="flex items-center px-2 py-2 text-xs border rounded cursor-pointer border-slate-400 text-slate-100">
            <Image
              src={enFlag}
              alt="flag-country"
              className="object-contain w-5 h-4 mr-3"
            />
            <span>Việt Nam</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-8 bg-[#131A22] items-center">
        <div className="flex flex-col items-center">
          <ul className="flex items-center space-x-4 text-xs whitespace-nowrap max-md:flex-col text-slate-300 max-md:space-y-2">
            <li className="hover:underline">
              <Link href="">Thỏa thuận sử dụng</Link>
            </li>
            <li className="hover:underline">
              <Link href="">Cam kết bảo mật</Link>
            </li>
            <li className="hover:underline">
              <Link href="">Quyền riêng tư về quảng cáo</Link>
            </li>
          </ul>
          <h6 className="mt-1 text-xs text-slate-300">
            © 2022-2024, tronicsify.com, Inc. or its affiliates
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;
