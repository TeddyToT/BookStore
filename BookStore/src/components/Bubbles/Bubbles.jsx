import React from 'react';

const BubblesBG = () => {
  const bubbleClasses = [
    'w-20 h-20 left-[5%] animation-delay-0',
    'w-5 h-5 left-[10%] animation-delay-200',
    'w-5 h-5 left-[30%] animation-delay-400',
    'w-15 h-15 left-[10%] animation-delay-0 animation-duration-[8s]',
    'w-5 h-5 left-[85%] animation-delay-0',
    'w-28 h-28 left-[7%] animation-delay-300',
    'w-40 h-40 left-[95%] animation-delay-200',
    'w-6 h-6 left-[10%] animation-delay-1500 animation-duration-[15s]',
    'w-4 h-4 left-[20%] animation-delay-200 animation-duration-[10s]',
    'w-40 h-40 left-[85%] animation-delay-0 animation-duration-[5s]',
  ];

  return (
    <div className="absolute w-full h-screen bg-primary">
      <ul className="relative overflow-hidden w-full h-full">
        {bubbleClasses.map((classes, idx) => (
          <li
            key={idx}
            className={`absolute bg-white/20 rounded-full animate-float ${classes}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default BubblesBG;
