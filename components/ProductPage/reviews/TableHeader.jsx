import { useState } from "react";
import TableSelect from "./TableSelect";

const TableHeader = ({ reviews }) => {
  const [rating, setRating] = useState("");
  const [order, setOrder] = useState("");

  return (
    <div className="max-md:flex ">
      <div className="flex flex-wrap justify-end my-2">
        <TableSelect
          property={rating}
          text="rating"
          data={ratings.filter((item) => item.value !== rating)}
          handleChange={setRating}
        />
        <TableSelect
          property={order}
          text="order"
          data={orderOptions.filter((item) => item.value !== order)}
          handleChange={setOrder}
        />
      </div>
      <div className="w-full md:hidden"></div>
    </div>
  );
};

export default TableHeader;

const ratings = [
  {
    text: "Tất cả",
    value: "",
  },
  {
    text: "5 Sao",
    value: 5,
  },
  {
    text: "4 Sao",
    value: 4,
  },
  {
    text: "3 Sao",
    value: 3,
  },
  {
    text: "2 Sao",
    value: 2,
  },
  {
    text: "1 Sao",
    value: 1,
  },
];

const orderOptions = [
  {
    text: "Tất cả",
    value: "All",
  },
  {
    text: "Được khuyến nghị",
    value: "Recomended",
  },
  {
    text: "Mới nhất",
    value: "Most Recent to Oldest",
  },
  {
    text: "Cũ nhất",
    value: "Oldest to Most Recent",
  },
];
