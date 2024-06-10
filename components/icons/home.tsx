import React from "react";
import { twMerge } from "tailwind-merge";

const HomeIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(className)}
    >
      <path
        d="M1 9.85316L9.85316 1L18.7063 9.85316"
        stroke="#A3AED0"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={twMerge(className)}
      />
      <path
        d="M3.72412 7.12911V15.9823H15.9823V7.12911"
        stroke="#A3AED0"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={twMerge(className)}
      />
    </svg>
  );
};

export default HomeIcon;
