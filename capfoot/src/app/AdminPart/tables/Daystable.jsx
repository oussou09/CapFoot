import React, { useState } from 'react';

function Template({ onDaySelect }) {
  const [selectedOption, setSelectedOption] = useState('All'); // Default selected option
  const options = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDaySelect = (option) => {
    setSelectedOption(option);
    onDaySelect(option); // Pass the selected day to the parent component
  };

  return (
<div className="flex flex-wrap md:flex-nowrap w-full">
  {options.map((option, index) => (
    <a
      key={index}
      className={`w-full md:w-auto md:flex-none flex justify-center items-center font-medium px-5 py-2
        ${selectedOption === option
          ? "border-t border-b bg-gray-900 text-white border-gray-900 hover:bg-gray-800 rounded cursor-default"
          : "gap-x-2 border bg-white text-gray-800 border-gray-200 hover:bg-gray-100 rounded cursor-pointer"
        }
        shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400
        `}
      onClick={() => handleDaySelect(option)} // Update selected option on click
    >
      {option}
    </a>
  ))}
</div>

  );
}

export default Template;

