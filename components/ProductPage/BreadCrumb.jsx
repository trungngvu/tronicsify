import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const BreadCrumb = ({ category, subCategories }) => {
  return (
    <div className="flex items-center mx-2 my-4 text-sm text-gray-600">
      <Link className="hover:underline" href="/">
        Trang chủ
      </Link>
      <ChevronRightIcon className="h-3 mx-1" />
      <Link className="hover:underline" href={`/browse/${category.slug}`}>
        {category.name}
      </Link>
      {subCategories?.map((s, i) =>
        s.name ? (
          <>
            <ChevronRightIcon className="h-3 mx-1" />
            <Link
              key={s.slug}
              className="hover:underline"
              href={`/browse/${category.slug}?sub_category=${s.slug}`}
            >
              {s.name}
            </Link>
          </>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default BreadCrumb;
