import {
    Bars3Icon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const HeaderBottom = ({ handleOpenMenu }: any) => {
    return ( 
        <>
        <div className="flex items-center px-4 py-2 text-white bg-amazon-blue_dark md:bg-amazon-blue_light md:space-x-4 max-md:-mt-1 max-md:pb-4">
            <div
                onClick={handleOpenMenu}
                className="items-center hidden mr-2 text-lg cursor-pointer md:flex"
            >
                <Bars3Icon className="mr-1 h-7" />
                <span className="text-sm font-bold">All</span>
            </div>
            <div className="flex flex-grow text-sm max-md:overflow-x-scroll scrollbar-hide whitespace-nowrap ">
                <ul className="flex space-x-4">
                    <li className=""><Link href="/browse/cpu">CPU</Link></li>
                    <li className=""><Link href="/browse/gpu">Card đồ họa</Link></li>
                    <li className=""><Link href="/browse/main">Bo mạch chủ</Link></li>
                    <li className=""><Link href="/browse/ram">RAM </Link></li>
                    <li className=""><Link href="/browse/psu">Nguồn máy tính</Link></li>
                    <li className=""><Link href="/browse/cooler">Tản nhiệt</Link></li>
                </ul>
            </div>
            <div className="hidden text-sm md:inline">
                <a href="">Shop deals in Electronics</a>
            </div>
        </div>
    </>
    );
}
 
export default HeaderBottom;