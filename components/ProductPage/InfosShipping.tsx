import { LockClosedIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, StarIcon } from "@heroicons/react/24/solid";

const InfosShipping = ({ product }: any) => {
  return (
    <div className="flex flex-col row-span-2 p-3 border border-gray-300 rounded-lg max-h-96 md:col-span-2">
      <div className="mb-3 font-semibold">${product.price}</div>

      <div className="text-sm text-slate-600">
        <p>No Import Fees Deposit</p>
        <div className="flex">
          <p className="my-1 text-blue-500">
            {product.shippin
              ? `+${product.shipping}$ Shipping Fee`
              : "Free Shipping"}
          </p>
          <div className="flex items-center ml-2 text-blue-500 cursor-pointer hover:text-amazon-orange">
            Details
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      <div>
        <p>
          Delivery <b>Thursday, March 23</b>. Order within{" "}
          <span className="text-green-500">23 hrs 53 mins</span>
        </p>
      </div>

      <div className="my-2">
        <p className="font-semibold text-green-700 font-md">
          {product.quantity > 1 ? "In Stock" : "Sold"}
        </p>
      </div>

      {/* <button className="px-4 py-2 text-black rounded-full shadow bg-amazon-orange">
                Add to Cart
            </button> */}

      <div className="flex items-center mt-2 cursor-pointer">
        <LockClosedIcon className="h-4 mr-1" />
        <p className="text-blue-600 hover:text-amazon-orange">
          Secure transaction
        </p>
      </div>

      <table className="grid my-3 text-sm whitespace-nowrap">
        <tbody>
          <tr className="grid grid-cols-3">
            <td className="text-slate-500">Ships from</td>
            <td className="col-span-2">Amazon</td>
          </tr>
          <tr className="grid grid-cols-3">
            <td className="text-slate-500">Sold by</td>
            <td className="col-span-2">ATUAT</td>
          </tr>
          <tr className="grid grid-cols-3">
            <td className="text-slate-500">Returns</td>
            <td className="col-span-2 truncate">
              Eligible for Return, Refund or Replacement within 30 days of
              receipt
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div className="flex w-full bg-slate-200 h-0.5" />

            <div>add to list</div> */}
    </div>
  );
};

export default InfosShipping;
