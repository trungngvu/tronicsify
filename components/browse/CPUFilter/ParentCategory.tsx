import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const ParentCategory = ({
  category,
  subCategories,
  categoryHandler,
  replaceQuery,
}: any) => {
  const [show, setShow] = useState(false);

  const selectSubCategory = subCategories.filter(
    (c: any) => c.brand == category
  );

  const showSub = (e: any) => {
    e.stopPropagation();
    setShow((prev: any) => !prev);
  };

  return (
    <div>
      <h4
        onClick={() => {
          setShow((prev: any) => !prev);
        }}
        className="flex items-center justify-between my-2 font-semibold cursor-pointer"
      >
        <span className="flex items-center uppercase">
          <EllipsisHorizontalIcon className="w-4 h-4 mr-2" />
          {category}
        </span>
        {selectSubCategory.length > 0 && (
          <span>
            {show ? (
              <MinusIcon className="w-4 h-4" onClick={(e) => showSub(e)} />
            ) : (
              <PlusIcon className="w-4 h-4" onClick={(e) => showSub(e)} />
            )}
          </span>
        )}
      </h4>
      {show && subCategories.length > 0 && (
        <div className="my-1 ml-5">
          {selectSubCategory.map((sc: any) => {
            const check = replaceQuery("card", sc.keyword);
            return (
              <h5
                key={sc._id}
                onClick={() => categoryHandler(check.result)}
                className={`flex items-center cursor-pointer hover:font-semibold hover:text-yellow-500 ${
                  check.active && "text-yellow-500"
                }`}
              >
                <EllipsisHorizontalIcon className="w-4 h-4 mr-2" />
                <span>{sc.cpu}</span>
              </h5>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ParentCategory;
