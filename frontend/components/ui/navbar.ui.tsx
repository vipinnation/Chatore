import React from "react";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <section className="p-5 bg-primary text-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="transition ease-in-out duration-150 hover:line-through"
        >
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">
            ChatOre
          </span>
        </Link>
        <div>
          <button id="toggle-menu-button" className="z-50 md:hidden relative">
            <span className="sr-only">Toggle Menu</span>
            <div
              id="open"
              className="h-7 flex flex-col items-end justify-between"
            >
              <span className="block h-0.5 w-8 bg-red-900 rounded-full"></span>
              <span className="block h-0.5 w-6 bg-red-900 rounded-full"></span>
              <span className="block h-0.5 w-8 bg-red-900 rounded-full"></span>
            </div>
            <div
              id="close"
              className="hidden h-7 flex flex-col items-end justify-between"
            >
              <span className="block h-0.5 w-8  rounded-full origin-left transform rotate-45 translate-y-0.5"></span>
              <span className="block h-0.5 w-8  rounded-full origin-left transform -rotate-45 -translate-y-0.5"></span>
            </div>
          </button>
          <div
            id="toggle-menu"
            className="hidden md:block font-semibold text-white text-right text-3xl bg-gray-800 fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center md:text-lg md:relative  md:bg-transparent md:w-auto md:h-auto md:text-left"
          >
            <ul className="flex flex-col gap-y-7 md:flex-row md:gap-2">
              <li className="md:border-r md:px-4 md:border-red-200">
                <Link
                  href="/"
                  className="transition ease-in-out duration-150 hover:line-through"
                >
                  Home
                </Link>
              </li>

              <li className="md:border-r md:px-4 md:border-red-200">
                <Link
                  href=""
                  className="transition ease-in-out duration-150 hover:line-through"
                >
                  Abous us
                </Link>
              </li>
              <li className="md:px-4">
                <Link
                  href=""
                  className="transition ease-in-out duration-150 hover:line-through"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
