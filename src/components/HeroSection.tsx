"use client";
import { Leaf, ShoppingBasket, Smartphone, Truck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function HeroSection() {

// connecting every user to socket.io and generating their unique socket id and a socket id means , user is online
  const slides = [
    {
      id: 1,
      icon: (
        <Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg" />
      ),
      title: "Fresh Organic Groceries",
      subtitle:
        "Farm-fresh fruits, vegetables, and daily essentials delivered to you.",
      btnText: "Shop Now",
      bg: "https://images.unsplash.com/photo-1628102491629-778571d893a3?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      icon: (
        <Truck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg" />
      ),
      title: "Fast & Reliable Delivery",
      subtitle: "We ensure your groceries reach your doorstep in no time.",
      btnText: "Order Now",
      bg: "https://images.unsplash.com/photo-1607130232670-52123ba5be5c?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEZhc3QlMjAlMjYlMjBSZWxpYWJsZSUyMERlbGl2ZXJ5fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      icon: (
        <Smartphone className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />
      ),
      title: "Shop Anytime, Anywhere ",
      subtitle: "Easy and seamless online grocery shopping experience.",
      btnText: "Get Started",
      bg: "https://images.unsplash.com/photo-1683688684067-b87a189c7503?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RnJlc2glMjBPcmdhbmljJTIwR3JvY2VyaWVzfGVufDB8fDB8fHww",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[98%] mx-auto mt-24 md:mt-28 h-[70vh] md:h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
      {/* mode wait is added to wait for amimating current slide and then animate next slide and animate presence also used for same appearing animation */}
      <AnimatePresence mode="wait">
        <motion.div
          // added key = currslide to make slider animated as nodes are getting rerendered so it makes then do their task
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].bg}
            fill
            alt="slider"
            priority
            className="object-cover brightness-95 scale-105"
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-gray/35 via-gray/20 to-transparent" /> */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-6 max-w-3xl"
        >
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg">
            {slides[currentSlide].icon}
          </div>
          <h1 className="text-3x1 sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            {slides[currentSlide].title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl">
            {slides[currentSlide].subtitle}
          </p>
          <motion.button
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mt-4 text-green-700 hover:bg-green-100 px-8 py-3 rounded-full font-semibold bg-white
shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingBasket className="w-5 h-5" />
            {slides[currentSlide].btnText}
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
export default HeroSection;
