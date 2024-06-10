import React from "react";
import { twMerge } from "tailwind-merge";

const SetttingsIcon = ({ className }: { className: string }) => {
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
        d="M6 12L6 5"
        stroke="#1678F2"
        stroke-width="2.5"
        stroke-linecap="round"
        className={twMerge(className)}
      />
      <path
        d="M12 8L12 5"
        stroke="#1678F2"
        stroke-width="2.5"
        stroke-linecap="round"
        className={twMerge(className)}
      />
      <path
        d="M6 19L6 16"
        stroke="#1678F2"
        stroke-width="2.5"
        stroke-linecap="round"
        className={twMerge(className)}
      />
      <path
        d="M18 19L18 17"
        stroke="#1678F2"
        stroke-width="2.5"
        stroke-linecap="round"
        className={twMerge(className)}
      />
      <path
        d="M12 19L12 12"
        stroke="#1678F2"
        stroke-width="2.5"
        stroke-linecap="round"
        className={twMerge(className)}
      />
      <path
        d="M10 8L14 8"
        stroke="#1678F2"
        stroke-width="2.5"
        stroke-linecap="round"
        className={twMerge(className)}
      />
      <path
        d="M4 16L8 16"
        stroke="#1678F2"
        stroke-width="2.5"
        stroke-linecap="round"
        className={twMerge(className)}
      />
      <path
        d="M16 17H20"
        stroke="#1678F2"
        stroke-width="2.5"
        stroke-linecap="round"
        className={twMerge(className)}
      />
      <path
        d="M18 13L18 5"
        stroke="#1678F2"
        stroke-width="2.5"
        stroke-linecap="round"
        className={twMerge(className)}
      />
    </svg>
  );
};

export default SetttingsIcon;
