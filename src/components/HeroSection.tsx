"use client";
import { Leaf, Smartphone, Truck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function HeroSection() {
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
    <div className="relative w-[98%] mx-auto mt-24 md:mt-28 h-[70vh] md:h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
      {/* mode wait is added to wait for amimating current slide and then animate next slide and animate presence also used for same appearing animation */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default HeroSection;
