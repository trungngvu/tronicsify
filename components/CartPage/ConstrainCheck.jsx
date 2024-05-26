import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const ConstrainCheck = ({ cart }) => {
  const psu = cart?.find((item) => item.category === "psu");
  const cpu = cart?.find((item) => item.category === "cpu");
  const ram = cart?.filter((item) => item.category === "ram");
  const main = cart?.find((item) => item.category === "main");
  const ramCheck = ram?.find((ram) => ram.ram != main?.ram);
  const pcCase = cart?.find((item) => item.category === "case");
  const [wattage, setWattage] = useState(0);

  useEffect(() => {
    const newWattage = cart?.reduce((acc, item) => {
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
    <div className="flex flex-col flex-grow px-4 py-2 mt-4 bg-white border rounded h-fit">
      <h3 className="my-2 text-2xl font-semibold">Tính tương thích</h3>
      <div className="my-4 w-full bg-slate-200 h-[1px]" />
      {psu && psu?.wattage < wattage && (
        <div className="flex text-red-500">
          <ExclamationCircleIcon className="inline w-6 mr-1" />
          Công suất nguồn không đủ {`(${psu?.wattage}W < ${wattage}W)`}.
        </div>
      )}
      {psu && psu?.wattage < wattage * 1.2 && psu?.wattage > wattage && (
        <div className="flex text-yellow-500">
          <ExclamationTriangleIcon className="inline w-6 mr-1" />
          Công suất nguồn {`(${psu?.wattage}W)`} nên {">"}120% tổng công suất{" "}
          {`(>${Math.round(wattage * 1.2)}W)`}.
        </div>
      )}
      {cpu && main && cpu.cpu?.socket?.replace(/FCLGA/g, "") != main.socket && (
        <div className="flex text-red-500">
          <ExclamationCircleIcon className="inline w-6 mr-1" />
          Socket CPU và bo mạch chủ không tương thích{" "}
          {`(${cpu?.cpu?.socket?.replace(/FCLGA/g, "LGA ")} ≠ ${
            /^\d+$/.test(main.socket) ? "LGA" : ""
          } ${main.socket})`}
          .
        </div>
      )}
      {main && pcCase && main?.size != pcCase.size && (
        <div className="flex text-red-500">
          <ExclamationCircleIcon className="inline w-6 mr-1" />
          Bo mạch chủ và Case không cùng kích cỡ{" "}
          {`(${main?.size} ≠ ${pcCase.size})`}.
        </div>
      )}
      {main && ram.length > 0 && !!ramCheck && (
        <div className="flex text-red-500">
          <ExclamationCircleIcon className="inline w-6 mr-1" />
          Bo mạch chủ và RAM không tương thích{" "}
          {`(${main?.ram} ≠ ${ramCheck.ram})`}.
        </div>
      )}
      {!(psu && psu?.wattage < wattage) &&
        !(psu && psu?.wattage < wattage * 1.2 && psu?.wattage > wattage) &&
        !(
          cpu &&
          main &&
          cpu?.cpu?.socket?.replace(/FCLGA/g, "") != main.socket
        ) &&
        !(main && pcCase && main?.size != pcCase.size) &&
        !(main && ram.length > 0 && !!ramCheck) && (
          <div className="flex text-green-500">
            <CheckCircleIcon className="inline w-6 mr-1" /> Không có vấn đề về
            tương thích.
          </div>
        )}
    </div>
  );
};

export default ConstrainCheck;
