import React from "react";
import { useSwiper } from 'swiper/react';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const SwiperNavControl = () => {
    const swiper = useSwiper();
    return (
        <div className="w-full flex justify-end mt-5">
            <div className="w-1/3 flex flex-row justify-end gap-3">
                <button
                    onClick={() => swiper.slidePrev()}
                    className="relative flex items-center justify-end w-[70px] h-[40px] border border-[#3e3e3e]  rounded-xl overflow-hidden group"
                >
                    <FaArrowLeft className="w-full text-center text-2xl group-hover:text-white z-10"/>
                    
                    <div className="absolute bg-slate-700 w-0 h-[40px] group-hover:w-full top-0 duration-200"></div>
                </button>
                <button
                    onClick={() => swiper.slideNext()}
                    className="relative flex items-center justify-start w-[70px] h-[40px] border border-[#3e3e3e] rounded-xl overflow-hidden group"
                >
                    <FaArrowRight className="w-full text-center text-2xl group-hover:text-white z-10"/>
                    <div className="absolute bg-slate-700 w-0 h-[40px] group-hover:w-full top-0 duration-200"></div>
                </button>
            </div>
        </div>
    );
}

export default SwiperNavControl;