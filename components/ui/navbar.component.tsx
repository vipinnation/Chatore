import Link from "next/link";
import React from "react";

const NavbarComponent = () => {
  return (
    <>
      <header className="fixed w-full">
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <Link href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                ChatOre
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              <Link href="/sign-up">Sign Up</Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavbarComponent;
