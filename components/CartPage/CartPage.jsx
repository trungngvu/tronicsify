import Pagination from "@mui/material/Pagination";
import { createCart, deleteCart, toggleSharable } from "@/utils/cart";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { setActiveCart } from "@/redux/slices/CartSlice";
import { showDialog } from "@/redux/slices/DialogSlice";

import Checkout from "./Checkout";
import ConstrainCheck from "./ConstrainCheck";
import Category from "./Category";

import { PlusCircleIcon, TrashIcon, LinkIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "@heroicons/react/24/outline";

const CartPage = ({ carts, activeCartId }) => {
  const activeCartIndex =
    carts.findIndex((cart) => cart._id === activeCartId) + 1;
  const [page, setPage] = useState(activeCartIndex);
  useEffect(() => {
    setPage(activeCartIndex);
  }, [activeCartIndex]);
  const dispatch = useAppDispatch();

  const handleChange = (_, value) => {
    setPage(value);
    dispatch(setActiveCart(carts[value - 1]._id));
  };

  const handleCreateCart = (newCart) => {
    dispatch(createCart(newCart));
  };

  const handleDeleteCart = () => {
    dispatch(
      setActiveCart(carts.find((cart) => cart._id !== activeCartId)?._id)
    );
    dispatch(deleteCart(activeCartId));
  };
  const handleToggleSharable = () => {
    dispatch(toggleSharable(activeCartId));
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.hostname}/cart/${activeCartId}`
    );
    dispatch(
      showDialog({
        header: "Thành công",
        msgs: [
          {
            msg: "Đã sao chép địa chỉ liên kết vào bộ nhớ tạm.",
            type: "success",
          },
        ],
      })
    );
  };
  const categories = [
    { title: "Bộ vi xử lý", slug: "cpu" },
    { title: "Card đồ họa", slug: "gpu" },
    { title: "Bo mạch chủ", slug: "main" },
    { title: "RAM", slug: "ram" },
    { title: "Ổ cứng", slug: "disk" },
    { title: "Nguồn máy tính", slug: "psu" },
    { title: "Tản nhiệt", slug: "cooler" },
    { title: "Case máy tính", slug: "case" },
  ];

  return (
    <div className="flex flex-col gap-4 px-2 py-8 md:flex-row md:px-8">
      <div className="md:w-3/4">
        <div className="px-4 py-2 bg-white border rounded ">
          <div className="flex items-center justify-between">
            <h2 className="my-2 text-3xl font-bold">Xây dựng cấu hình</h2>
            <div className="flex items-center gap-3">
              <Pagination
                count={carts.length}
                page={page}
                onChange={handleChange}
              />
              <PlusCircleIcon
                className="w-10 cursor-pointer text-amazon-orange"
                onClick={() => handleCreateCart({ products: [] })}
              />
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer ${
                  carts[activeCartIndex - 1]?.sharable
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
                onClick={handleToggleSharable}
              >
                <ShareIcon className="w-4 text-white" />
              </div>
              {carts[activeCartIndex - 1]?.sharable && (
                <div
                  onClick={handleCopy}
                  className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-amazon-orange"
                >
                  <LinkIcon className="w-4 text-white" />
                </div>
              )}
              <div
                onClick={handleDeleteCart}
                className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full cursor-pointer"
              >
                <TrashIcon className="w-4 text-white" />
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-[1px]" />
          {categories.map((category, i) => (
            <Category
              key={i}
              title={category.title}
              slug={category.slug}
              cart={carts.find((cart) => cart._id === activeCartId)?.products}
            />
          ))}
        </div>
      </div>
      <div className="md:w-1/4">
        <Checkout
          cart={carts.find((cart) => cart._id === activeCartId)?.products}
        />
        <ConstrainCheck
          cart={carts.find((cart) => cart._id === activeCartId)?.products}
        />
      </div>
    </div>
  );
};

export default CartPage;
