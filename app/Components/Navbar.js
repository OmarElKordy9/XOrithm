"use client";

// Import useState from 'react' library
import { useState } from "react";
import Image from "next/image";
import { getSession, useSession, signOut } from "next-auth/react";

const Navbar = () => {
  let Links = [{ name: "Dashboard", link: "/" }];
  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}

        <div className="w-20 md:w-28">
          <a href="/">
            <Image
              src="/xorithm-logo.png"
              alt="logo"
              width={118}
              height={18}
              className="object-contain"
            />
          </a>
        </div>

        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:flex-row flex flex-col items-center md:pb-0 pb-6 absolute md:static bg-white md:z-auto z-20 left-0 w-full md:w-auto transition-all duration-500 ease-in ${
            open ? "top-12 justify-center items-center" : "top-[-490px]"
          }`}
        >
          {Links.map((link, index) => (
            <li
              key={index}
              className="md:ml-8 md:my-0  flex md:text-lg text-sm justify-center gap-4 mt-3 font-body "
            >
              <a
                href={link.link}
                className=" text-secondary hover:text-tertiary duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}

          <button
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
            className=" btn rounded-md bg-black px-5 py-1 mt-4 font-body text-white inline-block md:hidden"
          >
            Sign Out
          </button>
        </ul>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
          className="btn rounded-md bg-black px-5 py-1 font-body text-white hidden md:inline-block"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
