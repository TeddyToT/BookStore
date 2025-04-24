import React, { useState, useEffect } from 'react';

const Checkbox = ({ dropdownName, options, selectedOptions, setSelectedOptions }) => {

    const [localSelectedOptions, setLocalSelectedOptions] = useState([...selectedOptions]);

    useEffect(() => {
        // Đồng bộ trạng thái khi `selectedOptions` thay đổi từ cha
        setLocalSelectedOptions([...selectedOptions]);
    }, [selectedOptions]);

    const handleCheckboxClick = (option) => {
        let updatedOptions;
        if (localSelectedOptions.some((opt) => opt.categoryId === option.categoryId)) {
            // Bỏ chọn
            updatedOptions = localSelectedOptions.filter((opt) => opt.categoryId !== option.categoryId);
        } else {
            // Chọn
            updatedOptions = [...localSelectedOptions, option];
        }
        setLocalSelectedOptions(updatedOptions);
        setSelectedOptions(updatedOptions); // Cập nhật lại trạng thái cho cha
    };

    return (
        <div className="hidden pt-1 w-2/3 md:flex md:flex-col text-left">
            <div className="bg-zinc-300 rounded-t-lg">
                <label
                    className="inline-flex justify-between w-full rounded-t-md bg-white px-4 py-2 text-lg md:text-base font-medium text-gray-700"
                    id={`${dropdownName}-dropdown`}
                >
                    {dropdownName}

                </label>
            </div>
            <div className=" w-full rounded-b-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby={`${dropdownName}-dropdown`}>
                    {options.map((option) => (
                        <div key={option.categoryId} className="flex items-center px-4 py-2 hover:bg-zinc-300">
                            <label className="flex items-center w-full cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={localSelectedOptions.some((opt) => opt.categoryId === option.categoryId)}
                                    className=" cursor-pointer block h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    onChange={() => handleCheckboxClick(option)}
                                />
                                <div className="ml-1 text-xs lg:text-sm text-gray-700 w-full ">{option.name}</div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Checkbox;