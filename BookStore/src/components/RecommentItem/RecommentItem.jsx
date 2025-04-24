// import  { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Item from "../Item";
import SwiperNavControl from "./SwiperNavControl";



const RecommentItem = ({items}) => {

      

    return (
        <>
            
                <div className="w-11/12 ">
                    <p className="font-bold text-3xl text-center">SẢN PHẨM LIÊN QUAN</p>
                    <div className="mt-5">
                        <Swiper
                            slidesPerView={2}
                            breakpoints={{        
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                1257: {
                                  slidesPerView: 5,
                              },
                            }}
                            spaceBetween={10}
                            loop={true}
                            className="mySwiper"
                        >
                            {items.map((ele, index) => {
                                return (
                                    <SwiperSlide key={index}> <Item value={ele}/> </SwiperSlide>
                                )
                            })}
                            <SwiperNavControl />
                        </Swiper>
                    </div>
                </div>
            
        </>
    );
}

export default RecommentItem;