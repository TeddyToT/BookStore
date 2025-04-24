import React, { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const RollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false); 

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 0) {
                setIsVisible(true); 
            } else {
                setIsVisible(false); 
            }
        };

        window.addEventListener("scroll", toggleVisibility); 

        return () => window.removeEventListener("scroll", toggleVisibility); 
    }, []);

    const RollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        isVisible && ( 
            <div
                onClick={RollToTop}
                className="z-40 w-[8vw] md:w-[5vw] xl:w-[3vw] md:h-[7vh] h-[5vh] flex items-center justify-center bg-cyan-200 rounded-md animate-bounce fixed right-5 bottom-20 cursor-pointer"
            >
                <div className="flex items-center justify-center">
                    <FaArrowAltCircleUp size={30} />
                </div>
            </div>
        )
    );
};

export default RollToTopButton;
