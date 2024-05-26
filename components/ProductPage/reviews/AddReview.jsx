import { useAppDispatch } from "@/redux/hooks";
import { showDialog } from "@/redux/slices/DialogSlice";
import { uploadImages } from "@/request/upload";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { Rating } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ImagesReview from "./Images";

const AddReview = ({ product, setReviews }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  let uploaded_images = [];

  const handleSubmit = async () => {
    setLoading(true);
    let msgs = [];
    if (rating < 0.4) {
      msgs.push({
        msg: "Vui lòng chọn số sao!",
        type: "error",
      });
    }
    if (!review) {
      msgs.push({
        msg: "Vui lòng nhập đánh giá!",
        type: "error",
      });
    }
    if (msgs.length > 0) {
      dispatch(
        showDialog({
          header: "Lỗi thêm đánh giá mới!",
          msgs,
        })
      );
      setLoading(false);
      return;
    }
    if (images.length > 0) {
      let temp = [];
      if (images.length > 0) {
        temp = images.map((img) => dataURItoBlob(img));
      }
      const path = "review images";
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((img) => {
        formData.append("file", img);
      });
      uploaded_images = await uploadImages(formData);
    }
    const { data } = await axios.put(`/api/product/${product._id}/review`, {
      rating,
      review,
      images: uploaded_images,
    });
    console.log(data);
    setReviews(data.reviews);
    dispatch(
      showDialog({
        header: "Thêm đánh giá mới thành công!",
        msgs: [
          {
            msg: "Thêm đánh giá mới thành công.",
            type: "success",
          },
        ],
      })
    );
    setRating(0);
    setImages([]);
    setReview("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <ImagesReview images={images} setImages={setImages} />
      <textarea
        className="mt-4 p-3 w-full rounded-md bg-white h-[200px] border border-slate-200 outline-none resize-none"
        name="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Nhập đánh giá của bạn..."
      ></textarea>
      <div className="flex flex-col items-center md:flex-row md:space-x-10">
        <Rating
          className="mt-4"
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          style={{ color: "#FACF19", fontSize: "3rem" }}
        />
        <button
          disabled={loading}
          onClick={() => handleSubmit()}
          className={`w-full mt-4  p-3  font-semibold rounded-md transition-all ${
            loading
              ? "bg-gradient-to-r from-amazon-blue_light to-slate-400 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-amazon-orange to-yellow-300 text-amazon-blue_dark hover:scale-95"
          }`}
        >
          {loading ? "Đang tải lên..." : "Gửi đánh giá"}
        </button>
      </div>
    </div>
  );
};

export default AddReview;
