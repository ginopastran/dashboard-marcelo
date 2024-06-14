import React from "react";
import { twMerge } from "tailwind-merge";

const LayersIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(className)}
    >
      <path
        d="M10.4934 10.0926C10.2913 10.1841 10.0735 10.2314 9.85321 10.2314C9.63296 10.2314 9.41508 10.1841 9.21306 10.0926L1.44952 6.34052C1.32345 6.27418 1.21751 6.17261 1.14349 6.04715C1.06947 5.92168 1.03027 5.77724 1.03027 5.6299C1.03027 5.48256 1.06947 5.33812 1.14349 5.21265C1.21751 5.0872 1.32345 4.98563 1.44952 4.91928L9.21306 1.13877C9.41508 1.04724 9.63296 1 9.85321 1C10.0735 1 10.2913 1.04724 10.4934 1.13877L18.2569 4.89085C18.383 4.95721 18.4889 5.05877 18.5629 5.18422C18.637 5.30969 18.6761 5.45413 18.6761 5.60147C18.6761 5.74881 18.637 5.89325 18.5629 6.01872C18.4889 6.14419 18.383 6.24575 18.2569 6.3121L10.4934 10.0926Z"
        stroke="#2D3659"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={twMerge(className)}
      />
      <path
        d="M18.7063 10.7322L10.398 14.7259C10.2205 14.8103 10.0278 14.8541 9.83273 14.8541C9.6377 14.8541 9.44493 14.8103 9.26749 14.7259L1 10.7322"
        stroke="#2D3659"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={twMerge(className)}
      />
      <path
        d="M18.7063 15.3512L10.398 19.3449C10.2205 19.4294 10.0278 19.4731 9.83273 19.4731C9.6377 19.4731 9.44493 19.4294 9.26749 19.3449L1 15.3512"
        stroke="#2D3659"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={twMerge(className)}
      />
    </svg>
  );
};

export default LayersIcon;
