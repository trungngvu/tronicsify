const Checkout = ({ total }: any) => {
  return (
    <div className="flex flex-col px-4 py-2 bg-white border rounded h-fit">
      <h3 className="my-2 text-2xl font-semibold">Tổng chi phí</h3>
      <div className="my-4 w-full bg-slate-200 h-[1px]" />
      <div className="flex items-center justify-between my-1 font-semibold text-salte-600">
        <span>Chi phí dự tính</span>
        <span className="text-xl text-red-500">{total.toLocaleString()}₫</span>
      </div>
    </div>
  );
};

export default Checkout;
