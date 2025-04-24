import React, { useState, useEffect } from "react";

const RadioCheckBox = ({ dropdownName, options, selectedOption, setSelectedOption }) => {
    const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);


    useEffect(() => {
        setLocalSelectedOption(selectedOption);
    }, [selectedOption]);

    const handleOptionClick = (option) => {
        setLocalSelectedOption(option);
        setSelectedOption(option);
    };

    return (
        <div className="hidden pt-1 w-2/3 md:flex md:flex-col text-left">
            <div className="bg-zinc-300 rounded-t-lg">
                <label className="inline-flex justify-between w-full rounded-t-md bg-white px-4 py-2 md:text-base font-medium text-gray-700">
                    {dropdownName}
                </label>
            </div>

            <div className="w-full rounded-b-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby={`${dropdownName}-dropdown`}>
                    {options.map((option) => (
                        <div key={option.manufacturerId} className="flex items-center px-4 py-2 hover:bg-zinc-300">
                            <label className="cursor-pointer w-full flex items-center">
                                <input
                                    type="radio"
                                    className="cursor-pointer block h-4 w-4 text-indigo-600"
                                    checked={localSelectedOption?.manufacturerId === option.manufacturerId}
                                    onChange={() => handleOptionClick(option)}
                                />
                                <span className="capitalize ml-2 text-sm text-gray-700">{option.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RadioCheckBox;
