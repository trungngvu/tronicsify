import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { createCart } from "@/utils/cart";
import { useAppDispatch } from "@/redux/hooks";

const Empty = () => {
  const dispatch = useAppDispatch();

  const handleCreateCart = (newCart) => {
    dispatch(createCart(newCart));
  };

  return (
    <div className="flex flex-col items-center py-6 mx-4 mt-6 space-y-4 bg-white border rounded min-h-[70vh] justify-center">
      <ShoppingBagIcon className="w-20 h-20" />
      <h1 className="text-3xl font-bold">Bạn chưa xây dựng cấu hình nào</h1>

      <button
        onClick={() => handleCreateCart({ products: [] })}
        className="flex items-center justify-center p-2 px-4 space-x-2 font-semibold rounded-full bg-gradient-to-r from-amazon-orange to-yellow-300 text-amazon-blue_dark hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-500"
      >
        TẠO CẤU HÌNH MỚI NGAY
      </button>
    </div>
  );
};

export default Empty;
