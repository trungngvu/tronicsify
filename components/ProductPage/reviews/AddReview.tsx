import DialogModal from "@/components/dialogModal";
import { useAppDispatch } from "@/redux/hooks";
import { showDialog } from "@/redux/slices/DialogSlice";
import { uploadImages } from "@/request/upload";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { Rating } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ImagesReview from "./Images";
import Select from "./Select";

let fits = ["Small", "True to size", "Large"];

const AddReview = ({ product, setReviews }: any) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  let uploaded_images: any = [];

  const handleSubmit = async () => {
    setLoading(true);
    let msgs = [];
    if (rating < 0.4) {
      msgs.push({
        msg: "Please select a rating!",
        type: "error",
      });
    }
    if (!review) {
      msgs.push({
        msg: "Please add a review!",
        type: "error",
      });
    }
    if (msgs.length > 0) {
      dispatch(
        showDialog({
          header: "Adding review error!",
          msgs,
        })
      );
      setLoading(false);
      return;
    }
    if (images.length > 0) {
      let temp: any = [];
      if (images.length > 0) {
        temp = images.map((img: any) => dataURItoBlob(img));
      }
      const path: any = "review images";
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((img: any) => {
        formData.append("file", img);
      });
      uploaded_images = await uploadImages(formData);
      console.log(uploaded_images);
    } else {
      const { data } = await axios.put(`/api/product/${product._id}/review`, {
        rating,
        review,
        images: uploaded_images,
      });
      setReviews(data.reviews);
      dispatch(
        showDialog({
          header: "Adding review Successfully!",
          msgs: [
            {
              msg: "Adding review Successfully.",
              type: "success",
            },
          ],
        })
      );
      setRating(0);
      setImages([]);
      setReview("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <DialogModal />
      <ImagesReview images={images} setImages={setImages} />
      <textarea
        className="mt-4 p-3 w-full rounded-md bg-white h-[200px] border border-slate-200 outline-none resize-none"
        name="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write you review here..."
      ></textarea>
      <div className="flex flex-col items-center md:flex-row md:space-x-10">
        <Rating
          className="mt-4"
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          precision={0.5}
          onChange={(e: any) => setRating(parseInt(e.target.value))}
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
          {loading ? "loading ..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default AddReview;