import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Layout } from "antd";
import { DataContexts } from "../../AppContexts/Contexts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { TbTruckDelivery } from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineAutorenew, MdOutlineShoppingCartCheckout } from "react-icons/md";

import ItemSwiper from "../../components/RecommentItem/ItemSwiper";
import AuhorSelector from "./AuthorSelector";
import InfoBox from "./InfoBox";
const Home = () => {
  const { banners, products } = useContext(DataContexts);
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="py-5 w-11/12 place-self-center">
      <div className="w-2/3">
      <Breadcrumb />
      </div>
      
      </div>
     

      <div className=" w-full mt-5 mb-10 rounded-sm border border-stroke shadow-default place-self-center ">
        <div className="w-full flex place-self-center place-items-center place-content-center justify-items-center items-center">
          <Swiper
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            
          >
            {banners.map((banner, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={banner} className="w-full md:h-[70vh] h-[50vh]" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="w-11/12 flex flex-col place-self-center place-content-center">
      <div className="flex flex-col sm:flex-row lg:w-3/4 w-full h-fit justify-around items-center place-self-center place-content-center md:gap-4 gap-1">
        
        <InfoBox
        icon={TbTruckDelivery} 
        title="Vận chuyển toàn quốc"
        content="Nhận hàng mọi nơi"
      />
      <InfoBox
        icon={FiCheckCircle}
        title="Bảo đảm chất lượng"
        content="Sản phẩm chính hãng" 
      />
      <InfoBox
        icon={MdOutlineAutorenew}
        title="Đổi trả sản phẩm"
        content="Nếu sản phẩm lỗi"
      />
       <InfoBox
        icon={MdOutlineShoppingCartCheckout}
        title="Đa dạng thanh toán"
        content="Nhiều phương thức"
      />
        
      </div>
      <div className="py-5 flex flex-col w-full">
        <h2 className="uppercase font-bold text-xl">
            Sản phẩm mới
        </h2>
        <ItemSwiper items={products} className="flex justify-center items-center" />
      </div>
      <div className="py-5 flex flex-col w-full">

        <AuhorSelector/>
      </div>
      </div>
    </div>
  );
};

export default Home;
