import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./productCard/ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";

const HomeProductSwiper = ({ products, category }: any) => {
  let selectedProducts = products.filter((p: any) => p.category === category);
  return (
    <div className="z-50 flex flex-col h-auto p-4 mx-4 mb-4 bg-white border rounded">
      <h4 className="mb-4 text-xl font-bold">{category}</h4>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        slidesPerGroup={1}
        navigation={true}
        modules={[Navigation]}
        className="w-full products-swiper_home "
        breakpoints={{
          640: {
            slidesPerView: 5,
            slidesPerGroup: 2,
          },
        }}
      >
        {selectedProducts.map((product: any, i: number) => (
          <SwiperSlide key={i}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeProductSwiper;
