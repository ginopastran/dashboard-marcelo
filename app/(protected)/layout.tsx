"use client";

import React from "react";
import { FileSearch, Moon, Sun } from "lucide-react";
import { Navigation } from "./_components/navigation";
import { useTheme } from "next-themes";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { setTheme } = useTheme();

  return (
    <div className="h-full flex dark:bg-[#1F1F1F] relative">
      {/* <div className="absolute top-0 right-0 mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2 z-50 dark:bg-slate-950">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FileSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <div
          className="cursor-pointer text-gray-600 dark:hidden block"
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Sun className="h-4 w-4 text-gray-600 dark:text-white dark:hidden" />
        </div>
        <div
          className="cursor-pointer text-gray-600 hidden dark:block"
          onClick={() => {
            setTheme("light");
          }}
        >
          <Moon className="h-4 w-4 text-gray-600 dark:text-white dark:block hidden" />
        </div>
      </div> */}
      <Navigation />
      <main className="h-full w-full flex flex-col bg-secondary-background dark:bg-slate-900 z-10">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
