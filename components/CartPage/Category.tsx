import Image from "next/image";
import Link from "next/link";

const Category = ({ title, slug }: any) => {
  return (
    <div className="flex flex-row items-center justify-between px-10 py-6">
      <div className="flex flex-row items-center gap-16">
        <div className="w-36">{title}</div>
        <div className="border rounded-xl">
          <Image
            src={`/assets/images/build_icons/${slug}.svg`}
            className="rounded-xl"
            alt="icon"
            width={100}
            height={100}
          />
        </div>
        <div>Vui lòng chọn linh kiện</div>
      </div>
      <Link href={`/browse/${slug}`}>
        <div className="px-5 py-3 rounded-lg cursor-pointer bg-amazon-orange">
          Chọn
        </div>
      </Link>
    </div>
  );
};

export default Category;
