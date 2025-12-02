import {
  ArrowLeft,
  EyeIcon,
  EyeOff,
  Leaf,
  Loader2,
  Lock,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import axios from "axios";

type propType = {
  previousStep: (n: number) => void;
};
function RegisterForm({ previousStep }: propType) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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
        onSubmit={handleRegister}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
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
            placeholder="Your Email"
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
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full border border-gray-300 text-gray-800 
               focus:ring-2 focus:ring-green-500 focus:outline-none 
               rounded-xl py-3 pl-10 pr-4"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPassword ? (
            <EyeIcon
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOff
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        {(() => {
          const formValidation = name != "" && email != "" && password != "";
          return (
            <button
              disabled={!formValidation || loading}
              className={`font-semibold py-3 rounded-xl transition-all duration-200 w-full inline-flex shadow-md items-center justify-center ${
                formValidation
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {/* here we have using animate-spin which is property of tailwing to
              spin the loader icon while the state is loading */}
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          );
        })()}

        <div className="flex items-center gap-2 text-gray-400 text-sm mt-3">
          <span className="flex-2 bg-gray-300 h-px"></span>OR{" "}
          <span className="flex-2 bg-gray-300 h-px"></span>
        </div>

        <button
          className="w-full flex items-center justify-center gap-3 border
border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200"
        >
          <Image src={"/google.png"} width={20} height={20} alt="google" />
          Continue with Google
        </button>
      </motion.form>
      <p className=" cursor-pointer flex items-center mt-6 text-gray-600 text-sm gap-1">
        Already have an account ? <LogIn className="w-4 h-4" />{" "}
        <span className="text-green-600 font-bold">Signin</span>
      </p>
    </div>
  );
}

export default RegisterForm;
