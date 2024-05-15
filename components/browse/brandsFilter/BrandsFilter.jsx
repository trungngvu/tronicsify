import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

const BrandsFilter = ({
  brands,
  brandHandler,
  replaceQuery,
  filter,
  defaultState = true
}) => {
  const [show, setShow] = useState(defaultState)
  return (
    <div className="w-full">
      <h3
        onClick={() => setShow(prev => !prev)}
        className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}
      >
        {filter.title}
        <span>
          {show ? (
            <MinusIcon className="w-5 h-5" />
          ) : (
            <PlusIcon className="w-5 h-5" />
          )}
        </span>
      </h3>
      {show && (
        <div className="grid grid-cols-2 gap-3">
          {brands.map((brand, i) => {
            const check = replaceQuery(filter.key, brand)
            return (
              <button
                key={i}
                onClick={() => brandHandler(check.result)}
                className={`${
                  check.active ? "border-slate-500 bg-orange-300" : ""
                } flex justify-center rounded border bg-white py-5 hover:border-slate-500 uppercase`}
              >
                {brand}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BrandsFilter
