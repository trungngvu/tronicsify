/* eslint-disable @next/next/no-img-element */
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  // Debounce delay in milliseconds
  const debounceDelay = 500;

  // Define your debounced search function
  const debouncedSearch = debounce(async (value) => {
    try {
      if (value) {
        const {
          data: { result },
        } = await axios.get(`/api/search?q=${value}&cat=${category}`);
        setResults(result);
      } else {
        setResults([]);
      }
    } catch (error) {
      // Handle axios error here
      console.error("Axios error:", error);
      // You can also set an error state or display a message to the user
    }
  }, debounceDelay);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    debouncedSearch(searchValue);
  };

  return (
    <div className="relative flex-grow" ref={searchRef}>
      <form className="flex items-center flex-grow rounded-md bg-amazon-orange max-md:mx-4 max-md:mb-2">
        <select
          onChange={(e) => setCategory(e.target.value)}
          defaultValue=""
          className="hidden w-32 px-2 text-sm text-gray-700 bg-gray-100 border-r border-gray-300 rounded-l outline-none cursor-pointer md:inline h-11"
        >
          <option value="">Tất cả</option>
          <option value="cpu">CPU</option>
          <option value="gpu">Card đồ họa</option>
          <option value="main">Bo mạch chủ</option>
          <option value="ram">RAM</option>
          <option value="psu">Nguồn</option>
          <option value="disk">Ổ cứng</option>
          <option value="cooler">Tản nhiệt</option>
          <option value="case">Case</option>
        </select>
        <input
          onFocus={() => setShowSearch(true)}
          type="text"
          className="w-full pl-3 text-black outline-none h-11 max-md:rounded-l"
          placeholder="Tìm kiếm linh kiện"
          onChange={handleSearch}
        />
        <button type="submit">
          <MagnifyingGlassIcon className="w-8 h-8 mx-2 my-1 cursor-pointer text-amazon-blue_dark" />
        </button>
      </form>
      {showSearch && results.length > 0 && (
        <div className="absolute z-20 w-full h-auto bg-white border rounded-sm shadow-md top-11">
          <ul className="text-black">
            {results.map((res) => (
              <Link href={`/product/${res.slug}`} key={res._id}>
                <li className="flex gap-5 px-3 py-2 font-semibold border-b cursor-pointer hover:bg-gray-100">
                  <img src={res.imgs[0]} alt="img" className="w-12" />
                  <div>
                    {res.title}
                    <div className="font-extrabold text-yellow-600">
                      {res.price.toLocaleString()}₫
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
