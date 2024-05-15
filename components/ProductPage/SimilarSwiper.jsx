import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../Home/productCard/ProductCard";

const SimilarSwiper = ({ title, products }) => {
  return (
    <div className="p-3 mx-2 my-1 bg-white rounded-md">
      <h4 className="pb-1 mb-2 font-semibold border-b">{title}</h4>
      <Swiper
        slidesPerView={4}
        spaceBetween={1}
        slidesPerGroup={3}
        navigation={true}
        modules={[Navigation]}
        className="products-swiper"
        breakpoints={{
          640: {
            slidesPerView: 5,
          },
        }}
      >
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarSwiper;
