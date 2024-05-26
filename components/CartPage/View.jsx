/* eslint-disable @next/next/no-img-element */
import { CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const View = ({ product }) => {
  const { title, slug, imgs, price, category } = product;

  const text = (title) => {
    switch (title) {
      case "cpu":
        return "Bộ vi xử lý";
      case "gpu":
        return "Card đồ họa";
      case "main":
        return "Bo mạch chủ";
      case "ram":
        return "RAM";
      case "disk":
        return "Ổ cứng";
      case "psu":
        return "Nguồn máy tính";
      case "cooler":
        return "Tản nhiệt";
      case "case":
        return "Case máy tính";
    }
  };

  return (
    <div className="flex flex-row items-center justify-between px-10 py-6">
      <div className="flex flex-row items-center gap-16">
        <div className="w-36">{text(category)}</div>
        <div className="border rounded-xl">
          <Link href={`/product/${slug}`} target="_blank">
            <img
              src={`${imgs[0] || `/assets/images/build_icons/${category}.svg`}`}
              className="rounded-xl"
              alt="icon"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="w-[27rem]">
          <Link
            href={`/product/${slug}`}
            className="hover:underline"
            target="_blank"
          >
            {title}
          </Link>
          <div className="text-lg font-bold text-red-500">
            {price?.toLocaleString()}₫
          </div>
          <div className="flex flex-row text-green-600">
            <CheckIcon className="w-5" /> Sẵn hàng
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
