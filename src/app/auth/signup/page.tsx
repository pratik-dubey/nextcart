"use client";
import RegisterForm from "@/components/RegisterForm";
import Welcome from "@/components/Welcome";
import React from "react";
import { useState } from "react";

function Register() {
  const [step, setStep] = useState(0);
  return (
    <div>
      {step === 0 ? (
        <Welcome nextStep={setStep} />
      ) : (
        <RegisterForm previousStep={setStep} />
      )}
    </div>
  );
}

export default Register;
