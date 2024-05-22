import { MinusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRef, useState } from "react";

const ImagesReview = ({ images, setImages }) => {
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, i) => {
      if (images.length == 3 || i == 2) {
        setError("Thêm được tối đa 3 hình ảnh.");
        return;
      }
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp"
      ) {
        setError(
          `${img.name} ảnh không được hỗ trợ! Chỉ hỗ trợ định dạng JPEG, PNG, WEBP.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024) {
        setError(`${img.name} dung lượng ảnh quá lớn (>5MB).`);
        files = files.filter((item) => item.name !== img.name);
      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };

  const removeImg = (image) => {
    setImages((images) => images.filter((img) => img !== image));
    if (images.length <= 3) {
      {
        setError("");
      }
    }
  };

  return (
    <div className="grid mt-5 md:grid-cols-4 ">
      <div className="flex flex-col justify-center">
        <input
          type="file"
          ref={inputRef}
          hidden
          multiple
          onChange={handleImages}
          accept="image/png,image/jpeg,image/webp"
        />
        <button
          className="p-2 text-white transition rounded-md bg-amazon-blue_light md:w-52 hover:scale-95"
          onClick={() => inputRef.current?.click()}
        >
          Thêm hình ảnh
        </button>
        <span className="mt-2 text-sm text-red-500">{error}</span>
      </div>
      <div className="flex max-md:mt-4 md:col-span-3">
        {images.length > 0 &&
          images.map((img, i) => (
            <span className="relative mx-2" key={i}>
              <span className="absolute z-10 p-1 transition rounded-full shadow-md cursor-pointer bg-slate-300 -top-3 -right-2 hover:bg-slate-400">
                <MinusIcon className="w-4 h-4" onClick={() => removeImg(img)} />
              </span>
              <Image
                src={img}
                alt={img}
                width={100}
                height={50}
                className="transition rounded-md cursor-pointer outline hover:outline-1 hover:outline-offset-2 hover:outline-slate-500"
              />
            </span>
          ))}
      </div>
    </div>
  );
};

export default ImagesReview;
