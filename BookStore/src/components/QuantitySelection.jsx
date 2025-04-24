import React, { useState } from "react";

const QuantitySelection = ({ quantity, updateQuantity, limit }) => {

    const [isLimit, setIsLimit] = useState(false)

    function AddQuantity() {
        if (quantity < limit) updateQuantity(quantity + 1)
        if (quantity == limit) setIsLimit(true)
    }

    function MinusQuantity() {
        setIsLimit(false)
        if (quantity > 1) updateQuantity(quantity - 1)
    }

    return (
        <div className="w-full">
            <div className="w-full flex flex-row items-center gap-3">
                <p className="font-bold text-base md:text-sm md:font-medium lg:font-bold">Số lượng: </p>
                <div className="flex flex-row items-center">
                    <div className="border border-[#3e3e3e] rounded-full p-1 cursor-pointer " onClick={MinusQuantity}>
                        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" ></path>
                        </svg>
                    </div>
                    <p className="mx-3 text-lg font-bold">{quantity}</p>
                    <div className="border border-[#3e3e3e] rounded-full p-1 cursor-pointer " onClick={AddQuantity}>
                        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                    </div>
                </div>
                <p className="font-bold text-base lg:font-bold lg:text-bold md:text-sm md:font-medium ">(Còn <span className=" font-medium">{limit}</span> sản phẩm)</p>
            </div>
            {isLimit && (
                <p className="italic font-medium text-[#fc0307]">Số lượng đạt giới hạn sản phẩm có sẵn</p>
            )}
        </div>
    );
}

export default QuantitySelection;