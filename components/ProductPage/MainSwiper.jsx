import { useState } from "react";

const MainSwiper = ({ images }) => {
  const [active, setActive] = useState(0);
  console.log(images);

  return (
    <div className="flex flex-col px-2 md:col-span-3 md:flex-row-reverse">
      <div className="relative">
        <img
          src={images[active]}
          alt="product image"
          width={600}
          height={600}
          className="object-cover"
        />
      </div>
      <div className="flex gap-2 max-md:mt-2 md:mr-2 md:flex-col">
        {images.slice(0, 6).map((img, i) => (
          <div
            key={img}
            className={`cursor-pointer gap-2 relative w-[100] ${
              i === active &&
              "outline outline-1 outline-offset-2 outline-slate-600 rounded"
            }`}
            onMouseOver={() => setActive(i)}
          >
            <img
              className="rounded"
              width={100}
              height={100}
              src={img}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSwiper;
