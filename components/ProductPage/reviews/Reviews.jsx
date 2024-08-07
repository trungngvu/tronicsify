import { Rating } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import AddReview from "./AddReview";
import Table from "./Table";

const Reviews = ({ product }) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(product.reviews);
  return (
    <div className="w-full p-4 mx-auto mt-4 border rounded-md bg-slate-100 md:w-4/5">
      <h3 className="mb-2 text-2xl font-bold">
        Nhận xét ({product.reviews?.length || 0})
      </h3>
      <div className="grid md:grid-cols-2">
        <div className="flex max-md:items-center md:flex-col md:justify-center">
          <span className="text-sm font-semibold">Đánh giá trung bình</span>
          <div className="flex items-center mt-2 font-semibold max-md:ml-auto text-m">
            <Rating
              name="half-rating-react"
              value={product.rating}
              readOnly
              style={{ color: "#FACF19 " }}
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          {product.ratings.map((rating, i) => (
            <div className="flex items-center space-x-4 max-md:mb-3" key={i}>
              <Rating
                name="half-rating-react"
                defaultValue={5 - i}
                readOnly
                style={{ color: "#FACF19 " }}
              />
              <div className="flex items-center bg-slate-300 w-full md:w-56 h-1.5 rounded-full">
                <div
                  className="bg-red-500 h-1.5 rounded-full"
                  style={{
                    width: `${rating.percentage}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-semibold">
                {rating.percentage != 'NaN' ? rating.percentage : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
      {session ? (
        <AddReview product={product} setReviews={setReviews} />
      ) : (
        <button
          onClick={() => signIn()}
          className="w-full px-4 py-2 mt-4 font-semibold rounded bg-amazon-orange"
        >
          Đăng nhập để thêm nhận xét
        </button>
      )}
      {reviews?.length > 0 && <Table reviews={reviews} productID={product._id} />}
    </div>
  );
};

export default Reviews;
