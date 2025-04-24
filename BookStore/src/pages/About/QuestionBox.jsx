import React, { useState } from "react";
import clsx from 'clsx'

const QuestionBox = ({ icon, tilte, context }) => {
    const [isShow, setIsShow] = useState(false)
    return (
        <div
            onClick={() => setIsShow(!isShow)}
            className="w-full border-b border-gray-400 mb-5 flex flex-col items-center cursor-pointer"
        >
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                    <img
                        src={icon}
                        className="w-[50px]"
                    />
                    <p
                        // className="text-2xl font-bold text-[#3e3e3e]"
                        className={clsx({
                            "md:text-2xl text-xl  font-bold text-[#3e3e3e] hover:text-[#1677ff] duration-150": !isShow,
                            "md:text-2xl text-xl  font-bold text-[#1677ff]": isShow
                        })}
                    >{tilte}</p>
                </div>
                <i
                    // className="fa-solid fa-plus text-3xl"
                    className={clsx({
                        "fa-solid fa-plus text-3xl duration-200 text-[#1677ff]": !isShow,
                        "fa-solid fa-plus text-3xl rotate-[45deg] duration-200 text-[#ff0000]": isShow
                    })}
                ></i>
            </div>
            <div
                // className="w-[95%] h-auto mt-3"
                className={clsx({
                    "w-[95%] h-auto  mt-3 duration-200 pb-7 overflow-hidden ": isShow,
                    "w-[95%] h-0 mt-3 duration-200 overflow-hidden ": !isShow
                })}
            >
                <p className="text-[17px] md:text-lg "><span className="text-xl font-black text-[#3e3e3e]">Book Store</span> {context}.</p>
            </div>
        </div>
    );
}

export default QuestionBox;