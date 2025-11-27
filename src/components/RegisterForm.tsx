import { ArrowLeft, Leaf, Lock, Mail, User } from "lucide-react";
import React from "react";
import { useState } from "react";
import { motion } from "motion/react";
type propType = {
  previousStep: (n: number) => void;
};
function RegisterForm({ previousStep }: propType) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
px-6 py-10 bg-white relative"
    >
      <div
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 hover: text-green-800 transition-colors cursor-pointer"
        onClick={() => previousStep(0)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
        Create Account
      </motion.h1>
      <p className="text-gray-600 mb-2 flex items-center gap-1">
        Join Sprynt today <Leaf className="h-5 w-5 text-green-600" />
      </p>
      <motion.form
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
        <div className="relative">
          <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 text-gray-800 
               focus:ring-2 focus:ring-green-500 focus:outline-none 
               rounded-xl py-3 pl-10 pr-4"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 text-gray-800 
               focus:ring-2 focus:ring-green-500 focus:outline-none 
               rounded-xl py-3 pl-10 pr-4"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Enter password"
            className="w-full border border-gray-300 text-gray-800 
               focus:ring-2 focus:ring-green-500 focus:outline-none 
               rounded-xl py-3 pl-10 pr-4"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </motion.form>
    </div>
  );
}

export default RegisterForm;
