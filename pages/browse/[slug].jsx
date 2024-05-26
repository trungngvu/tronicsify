import Product from "@/models/Product";
import GPUCategory from "@/models/GPU_category";
import CPUCategory from "@/models/CPU_category";

import db from "@/utils/db";
import ProductCard from "@/components/Home/productCard/ProductCard";
import { ChevronRightIcon, FunnelIcon } from "@heroicons/react/24/solid";

import BrandsFilter from "@/components/browse/brandsFilter/BrandsFilter";
import CategoriesFilter from "@/components/browse/categoriesFilter/CategoriesFilter";
import HeadingFilter from "@/components/browse/headingFilter/HeadingFilter";
import SliderRangeFilter from "@/components/browse/SliderRangeFilter";

import Link from "next/link";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import {
  generateRegexFromKeywordArrays,
  categoryName,
} from "@/utils/array_utils";
// import DotLoaderSpinner from "@/components/loaders/dotLoader/DotLoaderSpinner";

const Browse = ({
  categories,
  manufacturers,
  products,
  brands,
  graphics,
  processors,
  paginationCount,
}) => {
  const router = useRouter();
  // const [loading, setloading] = useState(false);

  const filter = (options) => {
    const path = router.pathname;
    const { query } = router;

    // Iterate over each property in options
    Object.entries(options).forEach(([key, value]) => {
      // Only update query if the value is truthy
      if (value) {
        query[key] = value;
        if (Object.keys(value).length === 0 && value.constructor === Object)
          delete query[key];
      }
    });

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (category) => {
    filter({ category });
  };
  const brandHandler = (brand) => {
    filter({ brand });
  };
  const lineHandler = (line) => {
    filter({ line });
  };
  const sizeHandler = (size) => {
    filter({ size });
  };
  const manufacturerHandler = (manufacturer) => {
    filter({ manufacturer });
  };
  const cardHandler = (card) => {
    filter({ card });
  };
  const sub_categoryHandler = (sub_category) => {
    filter({ sub_category });
  };

  //cpu
  const processorHandler = (processor) => {
    filter({ processor });
  };
  const busHandler = (bus) => {
    filter({ bus });
  };
  const socketHandler = (socket) => {
    filter({ socket });
  };
  const coreHandler = (min, max) => {
    filter({ core: `${min}_${max}` });
  };
  const threadHandler = (min, max) => {
    filter({ thread: `${min}_${max}` });
  };
  const clockHandler = (min, max) => {
    filter({ clock: `${min}_${max}` });
  };
  const ramCapHandler = (min, max) => {
    filter({ ram_cap: `${2 ** min}_${2 ** max}` });
  };
  const wattageHandler = (min, max) => {
    filter({ wattage: `${min}_${max}` });
  };

  function debounce(fn, delay) {
    let timeout = null;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(args[0]);
      }, delay);
    };
  }

  const priceHandler = (price, type, delay) => {
    let priceQuery = router.query.price?.split("_") || "";
    let min = priceQuery[0] || "";
    let max = priceQuery[1] || "";
    let newPrice = "";
    if (type == "min") {
      newPrice = `${price}_${max}`;
    } else {
      newPrice = `${min}_${price}`;
    }
    let filterPrice = debounce((price) => filter(price), delay);
    filterPrice({ price: newPrice });
  };

  const multiPriceHandler = (min, max) => {
    filter({ price: `${min}_${max}` });
  };

  const ratingHandler = (rating) => {
    filter({ rating });
  };

  const stockHandler = (stock) => {
    filter({ stock });
  };
  const sortHandler = (sort) => {
    if (sort == "") {
      filter({ sort: {} });
    } else {
      filter({ sort });
    }
  };
  const pageHandler = (e, page) => {
    filter({ page });
  };

  const replaceQuery = (queryName, value) => {
    const existedQuery = router.query[queryName];
    const valueCheck = existedQuery
      ? new RegExp(`(^|_)${value}(?:_|$)`).test(existedQuery)
      : false;
    const _check = existedQuery
      ? new RegExp(`(^|_)_${value}(?:_|$)`).test(existedQuery)
      : false;
    let result = null;
    if (existedQuery) {
      if (existedQuery == value) {
        result = {};
      } else {
        if (valueCheck) {
          // if filtered value is in query & we want to remove it.
          if (_check) {
            // last
            result = existedQuery.replace(`_${value}`, "");
          } else if (existedQuery.startsWith(`${value}_`)) {
            // first
            result = existedQuery.replace(`${value}_`, "");
          } else {
            // middle
            result = existedQuery
              .replace(`_${value}`, "")
              .replace(`${value}_`, "");
          }
        } else {
          // if filtered value doesn't exist in Query & we want to add it.
          result = `${existedQuery}_${value}`;
        }
      }
    } else {
      result = value;
    }
    return {
      result,
      active: existedQuery && valueCheck ? true : false,
    };
  };

  return (
    <div className="gap-2 p-1 mx-auto max-w-screen-2xl bg-slate-100 md:p-6">
      <div>
        <div className="flex items-center text-sm">
          <Link className="hover:underline" href="/">
            Trang chủ
          </Link>

          <ChevronRightIcon className="w-4 h-4 mx-1 " />
          <span className="text-slate-700">
            {categoryName(router.query.slug)}
          </span>
        </div>
      </div>

      <div className="relative grid grid-cols-5 gap-1 mt-4 md:gap-5">
        <div className="flex flex-col col-span-5 md:col-span-1 md:items-center">
          <button
            onClick={() => {
              router.push(
                `${router.pathname.split("[slug]")[0]}/${router.query.slug}`
              );
            }}
            className={`flex items-center justify-center w-56 md:w-full py-2 rounded transition-all duration-300 bg-amazon-blue_light text-white hover:scale-95 border-amazon-blue_dark`}
          >
            <FunnelIcon className="w-4 h-4 mr-3" />
            Đặt lại bộ lọc ({Object.keys(router.query).length - 1})
          </button>
          {router.query.slug === "disk" && (
            <>
              <SliderRangeFilter
                scale={(val) => 2 ** val}
                title="Dung lượng"
                range={[7, 15]}
                valueLabelFormat={(value) => {
                  if (value > 1000) {
                    return Math.floor(value / 1000) + "TB";
                  } else {
                    return value + "GB";
                  }
                }}
                onChange={ramCapHandler}
                defaultValue={
                  router.query.ram_cap
                    ?.split("_")
                    .map((val) => Math.log2(val)) || [7, 15]
                }
              />
              <BrandsFilter
                filter={{ title: "Loại ổ cứng", key: "sub_category" }}
                brands={[{ name: "ssd" }, { name: "hdd" }]}
                brandHandler={sub_categoryHandler}
                replaceQuery={replaceQuery}
              />
            </>
          )}
          {router.query.slug === "cooler" && (
            <BrandsFilter
              filter={{ title: "Loại tản nhiệt", key: "sub_category" }}
              brands={[{ name: "air" }, { name: "aio" }]}
              brandHandler={sub_categoryHandler}
              replaceQuery={replaceQuery}
            />
          )}
          {router.query.slug === "case" && (
            <BrandsFilter
              filter={{ title: "Kích cỡ", key: "size" }}
              brands={[
                { name: "E-ATX" },
                { name: "M-ATX" },
                { name: "ATX" },
                { name: "ITX" },
              ]}
              brandHandler={sizeHandler}
              replaceQuery={replaceQuery}
            />
          )}

          {router.query.slug === "main" && (
            <>
              <CategoriesFilter
                title="Socket"
                categories={["Intel", "AMD"]}
                subCategories={[
                  { brand: "Intel", socket: "LGA 1150" },
                  { brand: "Intel", socket: "LGA 1151" },
                  { brand: "Intel", socket: "LGA 1155" },
                  { brand: "Intel", socket: "LGA 1200" },
                  { brand: "Intel", socket: "LGA 1700" },
                  { brand: "Intel", socket: "LGA 2011" },
                  { brand: "Intel", socket: "LGA 2066" },

                  { brand: "AMD", socket: "AM4" },
                  { brand: "AMD", socket: "AM5" },
                  { brand: "AMD", socket: "sTR5" },
                  { brand: "AMD", socket: "sTRX4" },
                ]}
                categoryHandler={socketHandler}
                replaceQuery={replaceQuery}
              />
              <BrandsFilter
                filter={{ title: "Kích cỡ", key: "size" }}
                brands={[
                  { name: "E-ATX" },
                  { name: "M-ATX" },
                  { name: "ATX" },
                  { name: "ITX" },
                ]}
                brandHandler={sizeHandler}
                replaceQuery={replaceQuery}
              />
            </>
          )}
          {router.query.slug === "ram" && (
            <>
              <SliderRangeFilter
                scale={(val) => 2 ** val}
                title="Dung lượng"
                range={[2, 8]}
                valueLabelFormat={(value) => `${value} GB`}
                onChange={ramCapHandler}
                defaultValue={
                  router.query.ram_cap
                    ?.split("_")
                    .map((val) => Math.log2(val)) || [2, 8]
                }
              />
              <CategoriesFilter
                title="Bus"
                categories={["DDR3", "DDR4", "DDR5"]}
                subCategories={[
                  { brand: "DDR3", bus: "1333 MHz" },
                  { brand: "DDR3", bus: "1600 MHz" },

                  { brand: "DDR4", bus: "2133 MHz" },
                  { brand: "DDR4", bus: "2400 MHz" },
                  { brand: "DDR4", bus: "2666 MHz" },
                  { brand: "DDR4", bus: "3000 MHz" },
                  { brand: "DDR4", bus: "3200 MHz" },
                  { brand: "DDR4", bus: "3600 MHz" },
                  { brand: "DDR4", bus: "4000 MHz" },
                  { brand: "DDR4", bus: "4800 MHz" },
                  { brand: "DDR4", bus: "6000 MHz" },
                  { brand: "DDR4", bus: "6200 MHz" },

                  { brand: "DDR5", bus: "4800 MHz" },
                  { brand: "DDR5", bus: "5200 MHz" },
                  { brand: "DDR5", bus: "5600 MHz" },
                  { brand: "DDR5", bus: "6000 MHz" },
                  { brand: "DDR5", bus: "6200 MHz" },
                  { brand: "DDR5", bus: "6400 MHz" },
                  { brand: "DDR5", bus: "7200 MHz" },
                ]}
                categoryHandler={busHandler}
                replaceQuery={replaceQuery}
              />
              <BrandsFilter
                filter={{ title: "Thế hệ", key: "line" }}
                brands={[{ name: "DDR3" }, { name: "DDR4" }, { name: "DDR5" }]}
                brandHandler={lineHandler}
                replaceQuery={replaceQuery}
              />
            </>
          )}
          {router.query.slug === "psu" && (
            <>
              <SliderRangeFilter
                title="Công suất"
                range={[250, 1000]}
                onChange={wattageHandler}
                step={10}
                valueLabelFormat={(value) => `${value}W`}
                defaultValue={router.query.wattage?.split("_") || [250, 1000]}
              />
            </>
          )}
          <BrandsFilter
            filter={{ title: "Thương hiệu", key: "brand" }}
            brands={brands}
            brandHandler={brandHandler}
            replaceQuery={replaceQuery}
          />
          {router.query.slug === "gpu" && (
            <>
              <CategoriesFilter
                title="Nhân đồ họa"
                categories={brands.map((brand) => brand.name)}
                subCategories={graphics}
                categoryHandler={cardHandler}
                replaceQuery={replaceQuery}
              />
              <BrandsFilter
                filter={{ title: "Nhà sản xuất", key: "manufacturer" }}
                defaultState={false}
                brands={manufacturers}
                brandHandler={manufacturerHandler}
                replaceQuery={replaceQuery}
              />
            </>
          )}
          {router.query.slug === "cpu" && (
            <>
              <BrandsFilter
                filter={{ title: "Dòng CPU", key: "line" }}
                brands={[
                  { name: "Core i9" },
                  { name: "Core i7" },
                  { name: "Core i5" },
                  { name: "Core i3" },
                  { name: "Ryzen Threadripper" },
                  { name: "Ryzen 9" },
                  { name: "Ryzen 7" },
                  { name: "Ryzen 5" },
                  { name: "Ryzen 3" },
                  { name: "Athlon" },
                  { name: "Pentium" },
                ]}
                brandHandler={lineHandler}
                replaceQuery={replaceQuery}
              />
              <CategoriesFilter
                title="Bộ vi xử lý"
                categories={brands.map((brand) => brand.name)}
                subCategories={processors}
                categoryHandler={processorHandler}
                replaceQuery={replaceQuery}
              />
              <SliderRangeFilter
                title="Số nhân"
                range={[2, 64]}
                onChange={coreHandler}
                defaultValue={router.query.core?.split("_") || [2, 64]}
              />
              <SliderRangeFilter
                title="Số luồng"
                range={[2, 192]}
                onChange={threadHandler}
                defaultValue={router.query.thread?.split("_") || [2, 192]}
              />
              <SliderRangeFilter
                title="Xung nhịp"
                range={[2.4, 6.2]}
                step={0.1}
                valueLabelFormat={(value) => `${value} GHz`}
                onChange={clockHandler}
                defaultValue={router.query.clock?.split("_") || [2.4, 6.2]}
              />
            </>
          )}
        </div>

        <div className="flex flex-col content-start col-span-5 md:col-span-4">
          <HeadingFilter
            priceHandler={priceHandler}
            multiPriceHandler={multiPriceHandler}
            ratingHandler={ratingHandler}
            sortHandler={sortHandler}
            replaceQuery={replaceQuery}
            stockHandler={stockHandler}
          />
          <div className="flex flex-wrap items-start gap-4 mt-6">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
          <div className="flex items-end justify-end w-full my-4">
            <Pagination
              count={paginationCount}
              variant="outlined"
              defaultPage={Number(router.query.page) || 1}
              onChange={pageHandler}
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;

export async function getServerSideProps(context) {
  const { query } = context;
  const category = query.slug;
  const subCategoryQuery = query.subCategory || "";
  const priceQuery = query.price?.split("_") || "";
  const wattageQuery = query.wattage?.split("_") || "";
  const coreQuery = query.core?.split("_") || "";
  const threadQuery = query.thread?.split("_") || "";
  const clockQuery = query.clock?.split("_") || "";
  const ratingQuery = query.rating || "";
  const stockQuery = query.stock || "";
  const sortQuery = query.sort || "";
  const pageSize = 15;
  const page = query.page || 1;
  // --------------------------------------------------
  const brandQuery = query.brand?.split("_") || "";
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);
  // --------------------------------------------------
  const sub_categoryQuery = query.sub_category?.split("_") || "";
  const sub_categoryRegex = `^${sub_categoryQuery[0]}`;
  const sub_categorySearchRegex = createRegex(
    sub_categoryQuery,
    sub_categoryRegex
  );
  // --------------------------------------------------
  const lineQuery = query.line?.split("_") || [];
  const lineSearchRegex = generateRegexFromKeywordArrays(lineQuery, []);
  // --------------------------------------------------
  const ramCapQuery = query.ram_cap?.split("_") || [];
  // --------------------------------------------------
  const socketQuery = query.socket?.split("_") || "";
  // --------------------------------------------------
  const sizeQuery = query.size?.split("_") || "";
  // --------------------------------------------------
  const ramBusQuery = query.bus?.split("_") || [];
  const ramBusSearchRegex = generateRegexFromKeywordArrays(ramBusQuery, []);
  // --------------------------------------------------
  const processorQuery = query.processor?.split("_") || [];
  // --------------------------------------------------
  const manufacturerQuery = query.manufacturer?.split("_") || "";
  const manufacturerRegex = `^${manufacturerQuery[0]}`;
  const manufacturerSearchRegex = createRegex(
    manufacturerQuery,
    manufacturerRegex
  );
  // --------------------------------------------------
  const cardQuery = query.card?.split("_") || [];
  // --------------------------------------------------
  const stock = stockQuery && stockQuery !== "" ? { availability: true } : {};
  const subCategory =
    subCategoryQuery && subCategoryQuery !== ""
      ? { subCategory: subCategoryQuery }
      : {};
  // const brand = brandQuery && brandQuery !== "" ? { brand: brandQuery } : {};
  const brand =
    brandQuery && brandQuery !== ""
      ? {
          brand: {
            $regex: brandSearchRegex,
            $options: "i",
          },
        }
      : {};
  const sub_category =
    sub_categoryQuery && sub_categoryQuery !== ""
      ? {
          sub_category: {
            $in: sub_categoryQuery,
          },
        }
      : {};
  const socket =
    socketQuery && socketQuery !== ""
      ? {
          socket: {
            $in: socketQuery,
          },
        }
      : {};
  const size =
    sizeQuery && sizeQuery !== ""
      ? {
          size: {
            $in: sizeQuery,
          },
        }
      : {};
  const line =
    lineQuery && lineQuery.length > 0
      ? {
          title: {
            $regex: lineSearchRegex,
          },
        }
      : {};
  const processor =
    processorQuery && processorQuery.length > 0
      ? {
          cpu: {
            $in: processorQuery,
          },
        }
      : {};
  const manufacturer =
    manufacturerQuery && manufacturerQuery !== ""
      ? {
          manufacturer: {
            $regex: manufacturerSearchRegex,
            $options: "i",
          },
        }
      : {};
  const card =
    cardQuery && cardQuery.length > 0
      ? {
          gpu: {
            $in: cardQuery,
          },
        }
      : {};
  const ram_cap =
    ramCapQuery && ramCapQuery.length > 0
      ? {
          capacity: {
            $gte: Number(ramCapQuery[0]) || 0,
            $lte: Number(ramCapQuery[1]) || Infinity,
          },
        }
      : {};
  const ram_bus =
    ramBusQuery && ramBusQuery.length > 0
      ? {
          title: {
            $regex: ramBusSearchRegex,
          },
        }
      : {};
  const price =
    priceQuery && priceQuery !== ""
      ? {
          price: {
            $gte: Number(priceQuery[0]) || 0,
            $lte: Number(priceQuery[1]) || Infinity,
          },
        }
      : {};
  const wattage = wattageQuery && wattageQuery !== "" ? {} : {};
  const core =
    coreQuery && coreQuery !== ""
      ? {
          core: {
            $gte: Number(coreQuery[0]) || 0,
            $lte: Number(coreQuery[1]) || Infinity,
          },
        }
      : null;
  const thread =
    threadQuery && threadQuery !== ""
      ? {
          thread: {
            $gte: Number(threadQuery[0]) || 0,
            $lte: Number(threadQuery[1]) || Infinity,
          },
        }
      : null;
  const clock =
    clockQuery && clockQuery !== ""
      ? {
          $or: [
            {
              boost_clock: {
                $exists: true,
                $gte: Number(clockQuery[0]) || 0,
                $lte: Number(clockQuery[1]) || Infinity,
              },
            },
            {
              base_clock: {
                $gte: Number(clockQuery[0]) || 0,
                $lte: Number(clockQuery[1]) || Infinity,
              },
            },
          ],
        }
      : null;
  const rating =
    ratingQuery && ratingQuery !== ""
      ? {
          rating: {
            $gte: Number(ratingQuery),
          },
        }
      : {};

  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "newest"
      ? { updatedAt: -1 }
      : sortQuery == "topSelling"
      ? { "subProducts.sold": -1 }
      : sortQuery == "topReviewed"
      ? { rating: -1 }
      : sortQuery == "priceHighToLow"
      ? { price: -1 }
      : sortQuery == "priceLowToHight"
      ? { price: 1 }
      : {};
  // --------------------------------------------------
  function createRegex(data, styleRegex) {
    if (data.length > 1) {
      for (let i = 1; i < data.length; i++) {
        styleRegex += `|^${data[i]}`;
      }
    }
    return styleRegex;
  }
  // --------------------------------------------------
  await db.connectDb();

  let filteredProcessors;
  if (core || thread || clock) {
    filteredProcessors = await CPUCategory.find({
      ...core,
      ...thread,
      ...clock,
    }).select("keyword");
    filteredProcessors = {
      title: {
        $in: filteredProcessors.map((item) => new RegExp(item.keyword, "i")),
      },
    };
  }

  const sum_queries = {
    category,
    ...subCategory,
    ...manufacturer,
    ...brand,
    ...price,
    ...rating,
    ...stock,
    ...line,
    ...card,
    ...processor,
    ...ram_cap,
    ...ram_bus,
    ...filteredProcessors,
    ...wattage,
    ...sub_category,
    ...socket,
    ...size,
  };

  let products = await Product.find(sum_queries)
    .select(
      "-description -long_specs -short_specs -warranty -updatedAt -url -embedding"
    )
    .populate("cpu")
    .populate("gpu")
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort(sort)
    .allowDiskUse(true)
    .lean();

  const brands1 = await Product.aggregate([
    { $match: { category, brand: { $ne: null } } }, // Filter by category
    { $group: { _id: "$brand", count: { $sum: 1 } } }, // Group by manufacturer and count each
    { $sort: { count: -1 } }, // Sort by count in descending order
  ]);

  // Optional: Formatting the output to be more readable
  const brands = brands1.map((m) => ({
    name: m._id,
    count: m.count,
  }));

  let manufacturers;
  let graphics;

  if (category === "gpu") {
    const manufacturers1 = await Product.aggregate([
      { $match: { category, manufacturer: { $ne: null } } }, // Filter by category
      { $group: { _id: "$manufacturer", count: { $sum: 1 } } }, // Group by manufacturer and count each
      { $sort: { count: -1 } }, // Sort by count in descending order
    ]);

    // Optional: Formatting the output to be more readable
    manufacturers = manufacturers1.map((m) => ({
      name: m._id,
      count: m.count,
    }));

    try {
      // Step 1: Fetch distinct CPU identifiers and their counts
      const distinctGPUsWithCounts = await Product.aggregate([
        { $match: { category } }, // Match the category
        { $group: { _id: "$gpu", count: { $sum: 1 } } }, // Group by GPU and count each
        { $match: { _id: { $ne: null } } }, // Exclude null CPUs
      ]);

      // Extract the distinct GPU IDs
      const distinctGPUIds = distinctGPUsWithCounts.map((item) => item._id);

      // Step 2: Query the CPUCategory collection to get the GPU documents
      const gpuDocuments = await GPUCategory.find({
        _id: { $in: distinctGPUIds },
      });

      // Step 3: Combine the counts with the detailed GPU documents
      graphics = gpuDocuments.map((gpuDoc) => {
        const countInfo = distinctGPUsWithCounts.find(
          (item) => item._id.toString() === gpuDoc._id.toString()
        );
        return { ...gpuDoc.toObject(), count: countInfo ? countInfo.count : 0 };
      });
      graphics.sort((a, b) => b.count - a.count);
    } catch (err) {
      // Handle error
      console.error("Error fetching GPU data:", err);
    }
  }

  let processors;
  if (category === "cpu") {
    try {
      // Step 1: Fetch distinct CPU identifiers and their counts
      const distinctCPUsWithCounts = await Product.aggregate([
        { $match: { category } }, // Match the category
        { $group: { _id: "$cpu", count: { $sum: 1 } } }, // Group by CPU and count each
        { $match: { _id: { $ne: null } } }, // Exclude null CPUs
      ]);

      // Extract the distinct CPU IDs
      const distinctCPUIds = distinctCPUsWithCounts.map((item) => item._id);

      // Step 2: Query the CPUCategory collection to get the CPU documents
      const cpuDocuments = await CPUCategory.find({
        _id: { $in: distinctCPUIds },
      });

      // Step 3: Combine the counts with the detailed CPU documents
      processors = cpuDocuments.map((cpuDoc) => {
        const countInfo = distinctCPUsWithCounts.find(
          (item) => item._id.toString() === cpuDoc._id.toString()
        );
        return { ...cpuDoc.toObject(), count: countInfo ? countInfo.count : 0 };
      });
      processors.sort((a, b) => b.count - a.count);
    } catch (err) {
      // Handle error
      console.error("Error fetching CPU data:", err);
    }
  }

  const totalProducts = await Product.countDocuments(sum_queries);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      brands,
      graphics: graphics ? JSON.parse(JSON.stringify(graphics)) : null,
      processors: processors ? JSON.parse(JSON.stringify(processors)) : null,
      manufacturers: manufacturers ? manufacturers : null,
      paginationCount: Math.ceil(totalProducts / pageSize),
    },
  };
}
