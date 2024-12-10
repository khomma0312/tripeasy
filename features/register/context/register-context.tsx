"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type RegisterContextType = {
  step: "signup" | "verify";
  setStep: (step: "signup" | "verify") => void;
};

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<"signup" | "verify">("signup");

  return (
    <RegisterContext.Provider value={{ step, setStep }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterContext = () => {
  const context = useContext(RegisterContext);

  if (context === undefined) {
    throw new Error(
      "useRegisterContext must be used within a RegisterProvider"
    );
  }

  return context;
};
