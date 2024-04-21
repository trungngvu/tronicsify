import Link from "next/link";
import { useState, useEffect } from "react";

const Checkout = ({ cart }: any) => {
  const cpu = cart.find((item: any) => item.category === "cpu");
  const gpu = cart.find((item: any) => item.category === "gpu");
  const ram = cart
    .filter((item: any) => item.category === "ram")
    ?.reduce((acc: any, item: any) => acc + item.capacity, 0);
  const disk = cart
    .filter((item: any) => item.category === "disk")
    ?.reduce((acc: any, item: any) => acc + item.capacity, 0);
  const [wattage, setWattage] = useState(0);

  useEffect(() => {
    const newWattage = cart?.reduce((acc: any, item: any) => {
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
          return acc + (item.gpu?.tdp || item.cpu?.tdp);
        default:
          return acc + 0;
      }
    }, 0);
    setWattage(newWattage);
  }, [cart]);
  return (
    <div className="flex flex-col px-4 py-2 bg-white border rounded h-fit">
      <h3 className="my-2 text-2xl font-semibold">Tổng hợp cấu hình</h3>
      <div className="my-4 w-full bg-slate-200 h-[1px]" />
      <div className="flex items-center justify-between my-1 font-semibold text-slate-600">
        <span>Tổng chi phí</span>
        <span className="text-xl text-red-500">
          {cart
            ?.reduce((acc: any, item: any) => acc + item.price, 0)
            .toLocaleString()}
          ₫
        </span>
      </div>
      {(cpu || gpu || ram > 0 || disk > 0 || wattage > 0) && (
        <div className="my-4 w-full bg-slate-200 h-[1px]" />
      )}
      {cpu && (
        <div className="flex justify-between">
          <div className="font-bold text-slate-600">CPU</div>
          <Link
            className="text-amazon-orange hover:underline"
            href={`browse/cpu?processor=${cpu.cpu._id}`}
          >
            {cpu.cpu.cpu}
          </Link>
        </div>
      )}
      {gpu && (
        <div className="flex justify-between">
          <div className="font-bold text-slate-600">Card đồ họa</div>
          <Link
            className="text-amazon-orange hover:underline"
            href={`browse/gpu?card=${gpu.gpu._id}`}
          >
            {gpu.gpu.gpu}
          </Link>
        </div>
      )}
      {ram > 0 && (
        <div className="flex justify-between">
          <div className="font-bold text-slate-600">Tổng dung lượng RAM</div>
          <div className="text-slate-600">{ram}GB</div>
        </div>
      )}
      {disk > 0 && (
        <div className="flex justify-between">
          <div className="font-bold text-slate-600">Tổng dung lượng Ổ cứng</div>
          <div className="text-slate-600">
            {disk > 1024 ? `${(disk / 1024).toFixed(2)}TB` : `${disk}GB`}
          </div>
        </div>
      )}
      {wattage > 0 && (
        <div className="flex justify-between">
          <div className="font-bold text-slate-600">Công suất tiêu thụ</div>
          <div className="text-slate-600">{`${wattage}W`}</div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
