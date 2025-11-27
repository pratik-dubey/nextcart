// "use client";
// import React from "react";
// import { motion } from "motion/react";
// import { div } from "motion/react-client";
// import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";
// function Welcome() {
//   return (
//     <div
//       className="flex flex-col items-center justify-center min-h-screen
// text-center p-6"
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -25 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="flex items-center gap-3"
//       >
//         <ShoppingBasket className="w-10 h-10 text-green-600" />
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
//           Sprynt
//         </h1>
//       </motion.div>
//       <motion.p
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.3 }}
//         className="mt-4
// text-gray-700 text-lg md: text-xl max-w-lg"
//       >
//         Your one-stop destination for fresh groceries, organic produce, and
//         daily essentials delivered right to your doorstep.
//       </motion.p>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.7, delay: 0.3 }}
//         className="flex items-center justify-center mt-10 gap-10"
//       >
//         <ShoppingBasket
//           className="w-24 h-24 md:w-32 md:h-32 text-green-600
// drop-shadow-md"
//         />
//         <Bike
//           className="w-24 h-24 md:w-32 md:h-32 text-orange-500
// drop-shadow-md"
//         />
//       </motion.div>

//       <motion.button
//         initial={{
//           opacity: 0,
//           y: -10,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           duration: 0.6,
//           delay: 0.5,
//         }}
//         className="inline-flex items-center gap-2 bg-green-600
// hover:bg-green-700
// shadow-md transition-all duration-200 mt-10
// text-white font-semibold py-3 px-8 rounded-2xl cursor-pointer"
//       >
//         Next
//         <ArrowRight />
//       </motion.button>
//     </div>
//   );
// }

// export default Welcome;
"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";
type propType = {
  nextStep: (n: number) => void;
};
function Welcome({ nextStep }: propType) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
      text-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-3"
      >
        <ShoppingBasket className="w-10 h-10 text-green-600" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
          Sprynt
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="mt-4 text-gray-700 text-lg md:text-xl max-w-lg"
      >
        Your one-stop destination for fresh groceries, organic produce, and
        daily essentials delivered right to your doorstep.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="flex items-center justify-center mt-10 gap-10"
      >
        <ShoppingBasket
          className="w-24 h-24 md:w-32 md:h-32 text-green-600
          drop-shadow-md"
        />
        <Bike
          className="w-24 h-24 md:w-32 md:h-32 text-orange-500
          drop-shadow-md"
        />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.35,
        }}
        onClick={() => nextStep(1)}
        className="inline-flex items-center gap-2 bg-green-600
  hover:bg-green-700 hover:-translate-y-0.5
  shadow-md transition-transform transition-colors duration-150 mt-10
  text-white font-semibold py-3 px-8 rounded-2xl cursor-pointer"
      >
        Next
        <ArrowRight />
      </motion.button>
    </div>
  );
}

export default Welcome;
