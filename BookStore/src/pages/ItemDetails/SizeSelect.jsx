import React from "react";

const SizeSelect = ({ sizes, selectedSize, updateSelectedSize }) => {
  return (
    <div className="lg:flex grid md:grid-cols-3 grid-cols-3   gap-3 mt-3">
      {sizes.sort((a, b) => {
                return parseInt(a.size, 10) - parseInt(b.size, 10);
              }).map((item, index) => (
        <button
          key={index}
          onClick={() => updateSelectedSize(item)}
          className={`px-4 py-2 rounded-lg font-bold cursor-pointer ${
            selectedSize?.size === item.size ? "bg-blue-500 text-white" : "bg-gray-200"
          } hover:opacity-80`}
        >
          {item.size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelect;
