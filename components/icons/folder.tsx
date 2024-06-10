import * as React from "react";
import { twMerge } from "tailwind-merge";
const FolderIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    className={twMerge(className)}
  >
    <path
      stroke="#A3AED0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 16.664V2.363A1.36 1.36 0 0 1 2.362 1h5.026A1.36 1.36 0 0 1 8.75 2.036l.422 1.689h8.172a1.36 1.36 0 0 1 1.362 1.362v11.577a1.36 1.36 0 0 1-1.362 1.362H2.362A1.36 1.36 0 0 1 1 16.664"
      className={twMerge(className)}
    />
  </svg>
);
export default FolderIcon;
