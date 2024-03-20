import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import db from "@/utils/db";
import { removeDuplicates, randomize } from "@/utils/array_utils";
import Header from "@/components/Header/Header";
import ProductCard from "@/components/Home/productCard/ProductCard";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import BrandsFilter from "@/components/browse/brandsFilter/BrandsFilter";
import HeadingFilter from "@/components/browse/headingFilter/HeadingFilter";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// import DotLoaderSpinner from "@/components/loaders/dotLoader/DotLoaderSpinner";

const Browse = ({
  categories,
  subCategories,
  products,
  brands,
  paginationCount,
}: any) => {
  const router = useRouter();
  // const [loading, setloading] = useState(false);

  const filter = ({
    search,
    category,
    brand,
    price,
    rating,
    sort,
    page,
  }: any) => {
    const path = router.pathname;
    const { query } = router;

    if (search) query.search = search;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (sort) query.sort = sort;
    if (page) query.page = page;
    console.log("price > ", price);
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
    const existedQuery = router.query[queryName];
    const valueCheck = existedQuery?.search(value);
    const _check = existedQuery?.search(`_${value}`);
    let result = null;
    if (existedQuery) {
      if (existedQuery == value) {
        result = {};
      } else {
        if (valueCheck !== -1) {
          // if filtered value is in query & we want to remove it.
          if (_check !== -1) {
            // last
            result = existedQuery?.replace(`_${value}`, "");
          } else if (valueCheck == 0) {
            // first
            result = existedQuery?.replace(`${value}_`, "");
          } else {
            // middle
            result = existedQuery?.replace(value, "");
          }
        } else {
          // if filtered value doesn't exist in Query & we wan to add it.
          result = `${existedQuery}_${value}`;
        }
      }
    } else {
      result = value;
    }

    return {
      result,
      active: existedQuery && valueCheck !== -1 ? true : false,
    };
  };
  // ----------------------------------------
  const [scrollY, setScrollY] = useState(0);
  const [height, setHeight] = useState(0);
  const headerRef = useRef(null);
  const el = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    setHeight(headerRef.current?.offsetHeight + el.current?.offsetHeight + 50);

    return () => {
      {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      {/* {loading && <DotLoaderSpinner loading={loading} />} */}
      <Header title={"Browse Products"} searchHandler={searchHandler} />
      <div className="gap-2 p-1 mx-auto max-w-screen-2xl bg-slate-100 md:p-6">
        <div ref={headerRef}>
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

          <div ref={el} className="flex flex-wrap gap-3 mt-2">
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
          <div
            className={`h-[680px] col-span-5 md:col-span-1 flex flex-col md:items-center  overflow-y-auto overflow-x-hidden ${
              scrollY >= height ? "md:fixed md:w-[274px] md:top-2" : ""
            }`}
          >
            <button
              onClick={() => router.push("/browse")}
              className={`flex items-center justify-center w-56 md:w-full py-2 rounded transition-all duration-300 bg-amazon-blue_light text-white hover:scale-95 border-amazon-blue_dark`}
            >
              Clear All ({Object.keys(router.query).length})
            </button>
            {/* <CategoriesFilter
              categories={categories}
              subCategories={subCategories}
              categoryHandler={categoryHandler}
              replaceQuery={replaceQuery}
            /> */}
            <BrandsFilter
              brands={brands}
              brandHandler={brandHandler}
              replaceQuery={replaceQuery}
            />
          </div>

          <div
            className={`${
              scrollY >= height ? "md:block" : "hidden"
            } max-md:hidden md:col-span-1`}
          ></div>

          <div className="flex flex-col content-start col-span-5 md:col-span-4">
            <HeadingFilter
              priceHandler={priceHandler}
              multiPriceHandler={multiPriceHandler}
              ratingHandler={ratingHandler}
              sortHandler={sortHandler}
              replaceQuery={replaceQuery}
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
  const subCategoryQuery = query.category || "";
  const priceQuery = query.price?.split("_") || "";
  const ratingQuery = query.rating || "";
  const sortQuery = query.sort || "";
  const pageSize = 10;
  const page = query.page || 1;
  // --------------------------------------------------
  const brandQuery = query.brand?.split("_") || "";
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);
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
  const subCategory =
    subCategoryQuery && subCategoryQuery !== ""
      ? { category: subCategoryQuery }
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
  const price =
    priceQuery && priceQuery !== ""
      ? {
          price: {
            $gte: Number(priceQuery[0]) || 0,
            $lte: Number(priceQuery[1]) || Infinity,
          },
        }
      : {};
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
      : sortQuery == "popular"
      ? { rating: -1, "subProducts.sold": -1 }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : sortQuery == "topSelling"
      ? { "subProducts.sold": -1 }
      : sortQuery == "topReviewed"
      ? { rating: -1 }
      : sortQuery == "priceHighToLow"
      ? { "subProducts.sizes.price": -1 }
      : sortQuery == "priceLowToHight"
      ? { "subProducts.sizes.price": 1 }
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
  let productsDb = await Product.find({
    category,
    ...search,
    ...subCategory,
    ...brand,
    ...price,
    ...rating,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort(sort)
    .allowDiskUse(true)
    .lean();
  let products =
    sortQuery && sortQuery !== "" ? productsDb : randomize(productsDb);

  let brandsDb = await Product.find({ category }).distinct("brand");

  let brands = removeDuplicates(brandsDb);
  let totalProducts = await Product.countDocuments({
    category,
    ...search,
    ...subCategory,
    ...brand,
    ...price,
    ...rating,
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      brands,
      paginationCount: Math.ceil(totalProducts / pageSize),
    },
  };
}
