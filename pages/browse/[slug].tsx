import Product from "@/models/Product";
import GPUCategory from "@/models/GPU_category";
import CPUCategory from "@/models/CPU_category";

import db from "@/utils/db";
import Header from "@/components/Header/Header";
import ProductCard from "@/components/Home/productCard/ProductCard";
import { ChevronRightIcon, FunnelIcon } from "@heroicons/react/24/solid";

import BrandsFilter from "@/components/browse/brandsFilter/BrandsFilter";
import CategoriesFilter from "@/components/browse/categoriesFilter/CategoriesFilter";
import HeadingFilter from "@/components/browse/headingFilter/HeadingFilter";
import SliderRangeFilter from "@/components/browse/SliderRangeFilter";

import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import {
  generateRegexFromKeywordArrays,
  generateRAMCapacityRegex,
  createBusRegex,
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
}: any) => {
  const router = useRouter();
  // const [loading, setloading] = useState(false);

  const filter = (options: any) => {
    const path = router.pathname;
    const { query } = router;

    // Iterate over each property in options
    Object.entries(options).forEach(([key, value]) => {
      // Only update query if the value is truthy
      if (value) {
        query[key] = value;
      }
    });

    router.push({
      pathname: path,
      query: query,
    });
  };

  const searchHandler = (search: any) => {
    if (search == "") {
      filter({ search: {} });
    } else {
      filter({ search });
    }
  };
  const categoryHandler = (category: any) => {
    filter({ category });
  };
  const brandHandler = (brand: any) => {
    filter({ brand });
  };
  const lineHandler = (line: any) => {
    filter({ line });
  };
  const manufacturerHandler = (manufacturer: any) => {
    filter({ manufacturer });
  };
  const cardHandler = (card: any) => {
    filter({ card });
  };

  //cpu
  const processorHandler = (processor: any) => {
    filter({ processor });
  };
  const busHandler = (bus: any) => {
    filter({ bus });
  };
  const coreHandler = (min: any, max: any) => {
    filter({ core: `${min}_${max}` });
  };
  const threadHandler = (min: any, max: any) => {
    filter({ thread: `${min}_${max}` });
  };
  const clockHandler = (min: any, max: any) => {
    filter({ clock: `${min}_${max}` });
  };
  const ramCapHandler = (min: any, max: any) => {
    filter({ ram_cap: `${2 ** min}_${2 ** max}` });
  };
  const wattageHandler = (min: any, max: any) => {
    filter({ wattage: `${min}_${max}` });
  };

  function debounce(fn: any, delay: any) {
    let timeout: any = null;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(args[0]);
      }, delay);
    };
  }

  const priceHandler = (price: any, type: any, delay: any) => {
    let priceQuery = router.query.price?.split("_") || "";
    let min = priceQuery[0] || "";
    let max = priceQuery[1] || "";
    let newPrice = "";
    if (type == "min") {
      newPrice = `${price}_${max}`;
    } else {
      newPrice = `${min}_${price}`;
    }
    let filterPrice = debounce((price: any) => filter(price), delay);
    filterPrice({ price: newPrice });
  };

  const multiPriceHandler = (min: any, max: any) => {
    filter({ price: `${min}_${max}` });
  };

  const ratingHandler = (rating: any) => {
    filter({ rating });
  };

  const stockHandler = (stock: any) => {
    filter({ stock });
  };
  const sortHandler = (sort: any) => {
    if (sort == "") {
      filter({ sort: {} });
    } else {
      filter({ sort });
    }
  };
  const pageHandler = (e: any, page: any) => {
    filter({ page });
  };

  const replaceQuery = (queryName: any, value: any) => {
    const existedQuery: any = router.query[queryName];
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
    <>
      {/* {loading && <DotLoaderSpinner loading={loading} />} */}
      <Header title={"Browse Products"} searchHandler={searchHandler} />
      <div className="gap-2 p-1 mx-auto max-w-screen-2xl bg-slate-100 md:p-6">
        <div>
          <div className="flex items-center text-sm">
            <span className="text-slate-700">Home</span>
            <ChevronRightIcon className="w-4 h-4 mx-1 fill-slate-600 " />
            <span className="text-slate-700">Browse</span>
            {router.query?.category !== "" && (
              <>
                <ChevronRightIcon className="w-4 h-4 mx-1 fill-slate-600 " />
                <span className="text-slate-700">
                  {
                    categories?.find((x: any) => x._id == router.query.category)
                      ?.name
                  }
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            {categories?.map((c: any) => (
              <span
                onClick={() => categoryHandler(c._id)}
                className={`cursor-pointer flex items-center justify-center w-40 md:w-56 h-10 border bg-white rounded  transition-all duration-300 hover:bg-amazon-blue_light hover:text-white hover:scale-95 hover:border-amazon-blue_dark`}
                key={c._id}
              >
                {c.name}
              </span>
            ))}
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
              Xóa tất cả ({Object.keys(router.query).length - 1})
            </button>
            {router.query.slug === "ram" && (
              <>
                <SliderRangeFilter
                  scale={(val: number) => 2 ** val}
                  title="Dung lượng"
                  range={[2, 8]}
                  valueLabelFormat={(value: any) => `${value} GB`}
                  onChange={ramCapHandler}
                  defaultValue={
                    router.query.ram_cap
                      ?.split("_")
                      .map((val: number) => Math.log2(val)) || [2, 8]
                  }
                />
                <CategoriesFilter
                  title="Bus"
                  categories={["DDR3", "DDR4", "DDR5"]}
                  subCategories={[
                    { brand: "DDR3", bus: "1066 MHz" },
                    { brand: "DDR3", bus: "1333 MHz" },
                    { brand: "DDR3", bus: "1600 MHz" },

                    { brand: "DDR4", bus: "2133 MHz" },
                    { brand: "DDR4", bus: "2400 MHz" },
                    { brand: "DDR4", bus: "2666 MHz" },
                    { brand: "DDR4", bus: "2933 MHz" },
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
                  brands={["DDR3", "DDR4", "DDR5"]}
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
                  valueLabelFormat={(value: any) => `${value}W`}
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
                  categories={brands}
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
                    "Core i9",
                    "Core i7",
                    "Core i5",
                    "Core i3",
                    "Ryzen Threadripper",
                    "Ryzen 9",
                    "Ryzen 7",
                    "Ryzen 5",
                    "Ryzen 3",
                    "Athlon",
                    "Pentium",
                  ]}
                  brandHandler={lineHandler}
                  replaceQuery={replaceQuery}
                />
                <CategoriesFilter
                  title="Bộ vi xử lý"
                  categories={brands}
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
                  valueLabelFormat={(value: any) => `${value} GHz`}
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
              {products.map((product: any) => (
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
    </>
  );
};

export default Browse;

export async function getServerSideProps(context: any) {
  const { query } = context;
  const category = query.slug;
  const searchQuery = query.search || "";
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
  const lineQuery = query.line?.split("_") || [];
  const lineSearchRegex = generateRegexFromKeywordArrays(lineQuery, []);
  // --------------------------------------------------
  const ramCapQuery = query.ram_cap?.split("_") || [];
  const ramCapSearchRegex = generateRAMCapacityRegex(ramCapQuery);
  // --------------------------------------------------
  const ramBusQuery = query.bus?.split("_") || [];
  const ramBusSearchRegex = generateRegexFromKeywordArrays(ramBusQuery, []);
  // --------------------------------------------------
  const processorQuery = query.processor?.split("_") || [];
  const processorSearchRegex = generateRegexFromKeywordArrays(
    processorQuery,
    []
  );
  // --------------------------------------------------
  const manufacturerQuery = query.manufacturer?.split("_") || "";
  const manufacturerRegex = `^${manufacturerQuery[0]}`;
  const manufacturerSearchRegex = createRegex(
    manufacturerQuery,
    manufacturerRegex
  );
  // --------------------------------------------------
  const cardQuery = query.card?.split("_") || [];
  const cardSearchRegex = generateRegexFromKeywordArrays(cardQuery, [
    "Super",
    "Ti",
    "XT",
    "GRE",
  ]);
  // --------------------------------------------------
  const search =
    searchQuery && searchQuery !== ""
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
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
          title: {
            $regex: processorSearchRegex,
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
          title: {
            $regex: cardSearchRegex,
          },
        }
      : {};
  const ram_cap =
    ramCapQuery && ramCapQuery.length > 0
      ? {
          title: {
            $regex: ramCapSearchRegex,
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
  function createRegex(data: any, styleRegex: any) {
    if (data.length > 1) {
      for (let i = 1; i < data.length; i++) {
        styleRegex += `|^${data[i]}`;
      }
    }
    return styleRegex;
  }
  // --------------------------------------------------
  db.connectDb();

  let filteredProcessors;
  if (core || thread || clock) {
    filteredProcessors = await CPUCategory.find({
      ...core,
      ...thread,
      ...clock,
    }).select("keyword");
    filteredProcessors = {
      title: {
        $in: filteredProcessors.map(
          (item: any) => new RegExp(item.keyword, "i")
        ),
      },
    };
  }

  const sum_queries = {
    category,
    ...search,
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
  };
  console.log(sum_queries);
  let products = await Product.find(sum_queries)
    .select("title imgs slug price availability")
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort(sort)
    .allowDiskUse(true)
    .lean();

  const brands = await Product.find({ category }).distinct("brand");

  let manufacturers;
  let graphics;
  if (category === "gpu") {
    manufacturers = await Product.find({ category }).distinct("manufacturer");
    graphics = await GPUCategory.find();
  }

  let processors;
  if (category === "cpu") {
    processors = await CPUCategory.find();
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
