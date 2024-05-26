/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCartInDatabase } from "@/utils/cart";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";

const Category = ({ title, slug, cart }) => {
  const filtered = cart?.filter((item) => item.category === slug);
  const dispatch = useAppDispatch();
  const { activeCartId } = useAppSelector((state) => state.cart);

  return (
    <>
      {filtered?.map((check) => (
        <div
          className="flex flex-row items-center justify-between px-10 py-6"
          key={check._id}
        >
          <div className="flex flex-row items-center gap-16">
            <div className="w-36">{title}</div>
            <div className="border rounded-xl">
              <Link href={`/product/${check.slug}`} target="_blank">
                <img
                  src={`${
                    check
                      ? check.imgs[0] ||
                        `/assets/images/build_icons/${slug}.svg`
                      : `/assets/images/build_icons/${slug}.svg`
                  }`}
                  className="rounded-xl"
                  alt="icon"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="w-[27rem]">
              {check ? (
                <Link
                  href={`/product/${check.slug}`}
                  className="hover:underline"
                  target="_blank"
                >
                  {check.title}
                </Link>
              ) : (
                "Vui lòng chọn linh kiện"
              )}
              {check && (
                <>
                  <div className="text-lg font-bold text-red-500">
                    {check.price?.toLocaleString()}₫
                  </div>
                  {check.availability && (
                    <div className="flex flex-row text-green-600">
                      <CheckIcon className="w-5" /> Sẵn hàng
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-5">
            {check && (
              <div
                className="px-5 py-3 bg-red-500 rounded-lg cursor-pointer"
                onClick={() => {
                  const newCart = cart?.filter(
                    (item) => item._id !== check._id
                  );
                  dispatch(updateCartInDatabase(activeCartId, newCart));
                }}
              >
                <TrashIcon className="w-5 text-white" />
              </div>
            )}
            <Link href={`/browse/${slug}`}>
              <div className="w-20 px-5 py-3 text-center rounded-lg cursor-pointer bg-amazon-orange">
                {check ? "Sửa" : "Chọn"}
              </div>
            </Link>
          </div>
        </div>
      ))}
      {(filtered?.length === 0 || slug === "ram" || slug === "disk") && (
        <div className="flex flex-row items-center justify-between px-10 py-6">
          <div className="flex flex-row items-center gap-16">
            <div className="w-36">{title}</div>
            <div className="border rounded-xl">
              <img
                src={`/assets/images/build_icons/${slug}.svg`}
                className="rounded-xl"
                alt="icon"
                width={100}
                height={100}
              />
            </div>
            <div className="w-[27rem]">
              {filtered?.length > 0 && (slug === "ram" || slug === "disk")
                ? "Thêm linh kiện"
                : "Vui lòng chọn linh kiện"}
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <Link href={`/browse/${slug}`}>
              <div className="w-20 px-5 py-3 text-center rounded-lg cursor-pointer bg-amazon-orange">
                Chọn
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
