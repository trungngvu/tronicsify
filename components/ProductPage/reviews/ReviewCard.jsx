import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as Solid } from "@heroicons/react/24/solid";
import { Rating } from "@mui/material";
import { Image as Img } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const ReviewCard = ({ review, productID }) => {
  const { data: session } = useSession();

  const { name, image } = review.reviewBy;
  const [likes, setLikes] = useState(review.likes.length);
  const [likedByUser, setLikedByUser] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setLikedByUser(review.likes.includes(session.user.id));
    }
  }, [session, review.likes]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `/api/product/${productID}/review/${review._id}/like`
      );
      setLikes(response.data.likes);
      setLikedByUser(response.data.likedByUser);
    } catch (error) {
      console.error("Error liking the review", error);
    }
  };

  return (
    <div className="grid gap-1 mb-4 md:grid-cols-10">
      <div className="flex flex-col items-center mt-1 md:col-span-1">
        <Image
          width={55}
          height={55}
          src={image}
          alt={name}
          className="bg-cover rounded-xl outline outline-1 outline-offset-2 outline-slate-300"
        />
        <span className="mt-2 font-semibold text-center">{name}</span>
      </div>
      <div className="flex flex-col px-5 py-3 bg-white border md:col-span-9 md:flex-row rounded-xl">
        <div className="max-md:flex md:mr-6 mt-1 md:w-[75px] max-md:border-b max-md:pb-2 max-md:border-slate-100">
          {
            <Img
              src={review?.images[0]?.url}
              fallback="/assets/images/no-image.png"
              alt={name}
              className="rounded-xl outline outline-1 outline-offset-2 outline-slate-300"
            />
          }
          <div className="flex flex-col justify-center flex-grow ml-4 space-y-2 text-sm md:hidden text-slate-600">
            <Rating
              className=""
              name="half-rating-read"
              readOnly
              defaultValue={review.rating}
            />
            <div className="flex items-center">
              {likedByUser ? (
                <Solid
                  className="w-6 h-6 mr-1 text-blue-500 cursor-pointer"
                  onClick={handleLike}
                />
              ) : (
                <HandThumbUpIcon
                  className="w-6 h-6 mr-1 cursor-pointer"
                  onClick={handleLike}
                />
              )}
              <span>{likes} lượt thích</span>
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

            <div className="flex items-center ml-auto ">
              {likedByUser ? (
                <Solid
                  className="w-6 h-6 mr-1 text-blue-500 cursor-pointer"
                  onClick={handleLike}
                />
              ) : (
                <HandThumbUpIcon
                  className="w-6 h-6 mr-1 cursor-pointer"
                  onClick={handleLike}
                />
              )}
              <span>{likes} lượt thích</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-grow mt-2 tracking-wide text-slate-800 ">
              {review.review}
            </div>
            <span className="flex justify-end m-4 space-x-5 max-w-52">
              {review.images &&
                review.images.map((img, i) => (
                  <Img
                    key={i}
                    src={img.url}
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
