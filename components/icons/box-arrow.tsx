import React from "react";
import { twMerge } from "tailwind-merge";

const BoxArrowIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(className)}
    >
      <path
        d="M20 14L20 20M20 20L14 20M20 20L12 12"
        stroke="#1678F2"
        stroke-width="2.5"
        className={twMerge(className)}
      />
      <path
        d="M19 11L19 7C19 5.89543 18.1046 5 17 5L7 5C5.89543 5 5 5.89543 5 7L5 17C5 18.1046 5.89543 19 7 19L11 19"
        stroke="#1678F2"
        stroke-width="3"
        stroke-linecap="round"
        className={twMerge(className)}
      />
    </svg>
  );
};

export default BoxArrowIcon;
