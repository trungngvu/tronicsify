import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { Rating } from "@mui/material";
import Image from "next/image";

const ReviewCard = ({ review }: any) => {
  const { name, image } = review.reviewBy;
  return (
    <div className="grid mb-4 md:grid-cols-10">
      <div className="flex flex-col items-center mt-1 md:col-span-1">
        <Image
          src={image}
          width={55}
          height={55}
          alt={name}
          className="rounded-xl outline outline-1 outline-offset-2 outline-slate-300"
        />
        <span className="mt-2 font-semibold">{name}</span>
        {/* <span className="mt-2 font-xs text-slate-500">{review.updatedAt}</span> */}
      </div>
      <div className="flex flex-col px-5 py-3 bg-white border md:col-span-9 md:flex-row rounded-xl">
        <div className="max-md:flex md:mr-6 mt-1 md:w-[75px] max-md:border-b max-md:pb-2 max-md:border-slate-100">
          <Image
            src={review.style?.image}
            width={70}
            height={70}
            alt={name}
            className="rounded-xl outline outline-1 outline-offset-2 outline-slate-300"
          />
          <div className="flex flex-col justify-center flex-grow ml-4 space-y-2 text-sm md:hidden text-slate-600">
            <span className="">Size: {review.size}</span>
            <span className="">Fit: {review.fit}</span>
            <Rating
              className=""
              name="half-rating-read"
              readOnly
              defaultValue={review.rating}
              precision={0.5}
            />
            <div className="flex items-center ">
              <HandThumbUpIcon className="w-6 h-6 mr-1 cursor-pointer" />
              <span>{review.likes.likes}6 likes</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex-wrap items-center hidden pb-1 text-sm border-b md:flex border-slate-100 text-slate-600">
            <Rating
              className=""
              name="half-rating-read"
              readOnly
              defaultValue={review.rating}
            />
            <span className="ml-4">Size: {review.size}</span>
            <span className="ml-4">Fit: {review.fit}</span>
            <div className="flex items-center ml-auto ">
              <HandThumbUpIcon className="h-6 mr-1 cursor-pointer 2-6" />
              <span>{review.likes.likes} 6 likes</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-grow mt-2 tracking-wide text-slate-800 ">
              {review.review}
            </div>
            <span className="flex justify-end m-4 space-x-5 w-52">
              {review.images &&
                review.images.map((img: any, i: any) => (
                  <Image
                    key={i}
                    src={img.url}
                    width={50}
                    height={50}
                    alt={img.url}
                    className="cursor-pointer rounded-xl outline outline-1 outline-offset-2 outline-slate-300"
                  />
                ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
