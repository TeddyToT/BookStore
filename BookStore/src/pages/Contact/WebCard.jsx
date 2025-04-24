import logo from "../../assets/images/logo.png";
import React, {useContext} from "react";
import { MdPlace, MdLocalPhone  } from "react-icons/md";
import { IoMdMail } from "react-icons/io";

import { DataContexts } from "../../AppContexts/Contexts";
const WebCard = () => {
    const {shop} = useContext(DataContexts)
    return (
        <>
            <div className="w-full h-full flex flex-col items-center gap-5 border rounded-xl p-5">
                <img
                    src={shop.logodark}
                    className="w-1/2 "
                />
                <div className="border-b border-[#bbbbbb] w-3/4"></div>
                <p className="w-full text-white font-bold text-xl mt-5">THÔNG TIN LIÊN HỆ</p>
                <div className="w-full flex flex-row items-center gap-2 sm:gap-3">
                    <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] bg-[#1677ff] flex justify-center items-center rounded-full">
                        <IoMdMail size={30}/>
                    </div>
                    <div className="h-[40px] lg:h-[50px] flex flex-col justify-between">
                        <p className="text-[15px] font-medium text-white">Email</p>
                        <p className="text-[16px] font-bold text-[#1677ff]">{shop.email}</p>
                    </div>
                </div>
                <div className="w-full flex flex-row items-center gap-2 sm:gap-3">
                    <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] bg-[#1677ff] flex justify-center items-center rounded-full">
                        <MdLocalPhone size={30}/>
                    </div>
                    <div className="h-[40px] lg:h-[50px] flex flex-col justify-between">
                        <p className="text-[15px] font-medium text-white">Số điện thoại</p>
                        <p className="text-[16px] font-bold text-[#1677ff]">{shop.phone}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-1">
                    <div className="w-full flex flex-row items-center gap-2 sm:gap-3">
                        <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] bg-[#1677ff] flex justify-center items-center rounded-full">
                            <MdPlace size={30}/>
                        </div>
                        <div className="h-[40px] lg:h-[50px] flex flex-col justify-between">
                            <p className="text-[15px] font-medium text-white">Địa chỉ</p>
                            <p className="text-[16px] font-bold text-[#1677ff]">{shop.address}</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-center gap-3 mt-3">
                        <div className="w-[50px]"></div>
                        <a href="https://maps.app.goo.gl/TNkRmH6uTDPtwyL6A" target="_blank"
                            className="text-sm text-white hover:underline italic"
                        >
                            Đường dẫn Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WebCard;