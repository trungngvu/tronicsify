import {
  CheckIcon,
  ChevronDownIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "@mui/material";
import { useRouter, NextRouter } from "next/dist/client/router";
import { useState } from "react";

const HeadingFilter = ({
  priceHandler,
  multiPriceHandler,
  stockHandler,
  replaceQuery,
  ratingHandler,
  sortHandler,
}: any) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const check = replaceQuery("stock", router.query.stock == "0" ? false : "0");
  const checkRating = replaceQuery("rating", "4");
  const sortQuery = router.query.sort || "Recommended";
  return (
    <div className="flex flex-col w-full md:flex-row md:items-end gap-x-6">
      <div>
        <span className="mr-2">Giá:</span>
        <input
          className="mx-1 w-20 rounded border py-1.5 px-2 outline-none"
          type="number"
          placeholder="min"
          min="0"
          onChange={(e) => {
            priceHandler(e.target.value, "min", 500);
            setMinPrice(e.target.value);
          }}
          value={minPrice || (router.query.price as any)?.split("_")[0]}
        />
        <input
          className="mx-1 w-20 rounded border py-1.5 px-2 outline-none"
          type="number"
          placeholder="max"
          max="0"
          onChange={(e) => {
            priceHandler(e.target.value, "max", 500);
            setMaxPrice(e.target.value);
          }}
          value={maxPrice || (router.query.price as any)?.split("_")[1]}
        />
      </div>

      <div>
        <Tooltip
          title={<h2>Sản phẩm dưới 500k</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(0, 500000)}
        >
          <button className="tooltip_btn">
            <span style={{ height: "15%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Sản phẩm từ 500k đến 1 triệu</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(500000, 1000000)}
        >
          <button className="tooltip_btn">
            <span style={{ height: "30%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Sản phẩm từ 1 triệu đến 5 triệu</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(1000000, 5000000)}
        >
          <button className="tooltip_btn">
            <span style={{ height: "50%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Sản phẩm từ 5 triệu đến 10 triệu</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(5000000, 10000000)}
        >
          <button className="tooltip_btn">
            <span style={{ height: "75%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Sản phẩm trên 10 triệu</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(10000000, "")}
        >
          <button className="tooltip_btn">
            <span style={{ height: "100%" }}></span>
          </button>
        </Tooltip>
      </div>

      <div>
        <label
          onClick={() => stockHandler(check.result)}
          htmlFor="stock"
          className="flex items-center cursor-pointer"
        >
          <input
            className="w-4 h-4 mr-1.5"
            type="checkbox"
            name="stock"
            id="stock"
            checked={router.query.stock == "0"}
          />
          Còn hàng
        </label>
      </div>

      <div>
        <label
          onClick={() => ratingHandler(checkRating.result)}
          htmlFor="rating"
          className="flex items-center cursor-pointer"
        >
          <input
            className="w-4 h-4 mr-1"
            type="checkbox"
            name="rating"
            id="rating"
            checked={router.query.rating == "4"}
          />
          <StarIcon className="h-5 w-5 fill-[#FACF19]" />
          <StarIcon className="h-5 w-5 fill-[#FACF19]" />
          <StarIcon className="h-5 w-5 fill-[#FACF19]" />
          <StarIcon className="h-5 w-5 fill-[#FACF19]" />
          <span className="ml-1">& up</span>
        </label>
      </div>

      <div
        className="ml-auto dropdown_sortby"
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <span>Sắp xếp theo:</span>
        <button className="flex items-center ml-1">
          {sortingOptions.find((x: any) => x.value == sortQuery)?.name ||
            "Độ phù hợp"}{" "}
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </button>
        {show && (
          <ul>
            {sortingOptions.map((option: any, i: any) => (
              <li
                key={i}
                onClick={() => sortHandler(option.value)}
                className={`flex justify-between ${
                  sortQuery == option.value ? "font-semibold" : ""
                }`}
              >
                <a>{option.name}</a>
                {sortQuery == option.value ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HeadingFilter;

const sortingOptions = [
  {
    name: "Độ phù hợp",
    value: "",
  },
  {
    name: "Giá (từ thấp đến cao)",
    value: "priceLowToHight",
  },
  {
    name: "Giá (từ cao đến thấp)",
    value: "priceHighToLow",
  },
  {
    name: "Mới cập nhật",
    value: "newest",
  },
];
