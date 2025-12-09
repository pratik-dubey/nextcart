"use client";
import {
  LogOut,
  Package,
  Search,
  ShoppingCartIcon,
  User,
  X,
} from "lucide-react";
import mongoose from "mongoose";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}

function Nav({ user }: { user: IUser }) {
  const [open, setOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const profileDropdown = useRef<HTMLDivElement>(null);
  // logic to close profileDropdown when clicking on the screen outside it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropdown.current &&
        !profileDropdown.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div
      className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500
to-green-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-20 px-4
md:px-8 z-50"
    >
      <Link
        href={"/"}
        className=" text-white font-extrabold text-2xl sm:text-3xl tracking-wide
hover:scale-105 transition-transform"
      >
        Snapcart
      </Link>

      {/* <form> search bar ke liye = Enter key se instant search + Browser autocomplete! */}

      <form
        className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg
shadow-md"
      >
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search groceries ... "
          className="w-full outline-none
text-gray-700 placeholder-gray-400"
        />
      </form>

      <div className="flex items-center gap-3 md:gap-6 relative">
        <div
          className="bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md
hover:scale-105 transition md:hidden"
          onClick={() => setSearchBarOpen((prev) => !prev)}
        >
          <Search className="text-green-600 w-6 h-6" />
        </div>
        <Link
          href={""}
          className="relative
        bg-white rounded-full w-11 h-11 flex items-center
justify-center shadow-md hover:scale-105 transition"
        >
          <ShoppingCartIcon className="text-green-600 w-6 h-6" />
          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex
items-center justify-center rounded-full font-semibold shadow"
          >
            0
          </span>
        </Link>
        <div className="relative" ref={profileDropdown}>
          <div
            className=" bg-white rounded-full w-11 h-11 flex items-center
justify-center overflow-hidden shadow-md hover:scale-105
transition-transform "
            onClick={() => setOpen((prev) => !prev)}
          >
            {/* next js me user ki image dikhane se pehle hume next.config.ts me source batan padta hai , jaise yha image google se aa rhi hai   */}
            {user.image ? (
              <Image
                src={user.image}
                alt="user"
                fill
                className="object-cover rounded-full"
                unoptimized
                sizes="44px"
              />
            ) : (
              <User className="w-6 h-6 text-gray-600" />
            )}
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-999"
              >
                {/* fill property agar image me use ki hai to parent div ko relative
                karenge taaki parent ke respect me locate ho */}
                <div className="flex items-center gap-3 px-3 py-2 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden relative">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="user"
                        fill
                        className="object-cover rounded-full"
                        unoptimized
                        sizes="44px"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-gray-800 font-semibold">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>
                <Link
                  href={""}
                  className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg
font-medium text-gray-700"
                  onClick={() => setOpen(false)}
                >
                  <Package className="w-5 h-5 text-green-600" />
                  My Orders
                </Link>
                <button
                  className="flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium"
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/auth/signin" });
                  }}
                >
                  <LogOut className="w-5 h-5 text-red-600" /> Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {searchBarOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white
rounded-full shadow-lg z-40 flex items-center px-4 py-2"
              >
                <Search className="ltext-gray-500 w-5 h-5 mr-2" />
                <form className="grow">
                  <input
                    type="text"
                    className="w-full outline-none
text-gray-700"
                    placeholder="Search groceries..."
                  />
                </form>
                <button onClick={() => setSearchBarOpen(false)}>
                  <X className="text-gray-500 w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Nav;
