import Link from "next/link";

const Checkout = ({ cart }: any) => {
  const cpu = cart.find((item: any) => item.category === "cpu");
  const gpu = cart.find((item: any) => item.category === "gpu");
  const ram = cart
    .filter((item: any) => item.category === "ram")
    ?.reduce((acc: any, item: any) => acc + item.capacity, 0);
  const disk = cart
    .filter((item: any) => item.category === "disk")
    ?.reduce((acc: any, item: any) => acc + item.capacity, 0);
  const wattage = cart?.reduce((acc: any, item: any) => {
    switch (item.category) {
      case "ram":
        return acc + 5;
      case "disk":
        return acc + 10;
      case "main":
        return acc + 70;
      case "cooler":
        if (item.sub_category === "air") return acc + 10;
        else return acc + 25;
      case "cpu":
      case "gpu":
        return acc + item.gpu?.tdp || item.cpu?.tdp;
      default:
        return acc + 0;
    }
  }, 0);
  return (
    <div className="flex flex-col px-4 py-2 bg-white border rounded h-fit">
      <h3 className="my-2 text-2xl font-semibold">Tổng hợp cấu hình</h3>
      <div className="my-4 w-full bg-slate-200 h-[1px]" />
      <div className="flex items-center justify-between my-1 font-semibold text-salte-600">
        <span>Tổng chi phí</span>
        <span className="text-xl text-red-500">
          {cart
            ?.reduce((acc: any, item: any) => acc + item.price, 0)
            .toLocaleString()}
          ₫
        </span>
      </div>
      <div className="my-4 w-full bg-slate-200 h-[1px]" />
      {cpu && (
        <div className="flex justify-between">
          <div className="font-bold">CPU</div>
          <Link
            className="text-blue-600 hover:underline"
            href={`browse/cpu?processor=${cpu.cpu._id}`}
          >
            {cpu.cpu.cpu}
          </Link>
        </div>
      )}
      {gpu && (
        <div className="flex justify-between">
          <div className="font-bold">Card đồ họa</div>
          <Link
            className="text-blue-600 hover:underline"
            href={`browse/gpu?card=${gpu.gpu._id}`}
          >
            {gpu.gpu.gpu}
          </Link>
        </div>
      )}
      {ram && (
        <div className="flex justify-between">
          <div className="font-bold">Tổng dung lượng RAM</div>
          <div>{ram}GB</div>
        </div>
      )}
      {disk && (
        <div className="flex justify-between">
          <div className="font-bold">Tổng dung lượng Ổ cứng</div>
          <div>
            {disk > 1024 ? `${(disk / 1024).toFixed(2)}TB` : `${disk}GB`}
          </div>
        </div>
      )}
      {wattage && (
        <div className="flex justify-between">
          <div className="font-bold">Công suất tiêu thụ</div>
          <div>{`${wattage}W`}</div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
