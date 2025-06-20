"use client";

import { ReactNode } from "react";

type ButtonSizes = "sm" | "md" | "lg";
type ButtonVariants = "primary" | "secondary";

interface ButtonProps {
  children: ReactNode;
  size: ButtonSizes;
  variant: ButtonVariants;
  onClick: () => void;
}

const ButtonVariantStyles: Record<ButtonVariants, string> = {
  primary: "",
  secondary: "",
};

const ButtonSizeStyles: Record<ButtonSizes, string> = {
  sm: "",
  md: "px-5 py-2.5 m-2.5",
  lg: "",
};

const defaultStyles = "border w-fit cursor-pointer hover:bg-gray-200 focus:bg-gray-400 transition-all duration-300"

export const Button = ({ children, onClick, size, variant }: ButtonProps) => {
  return (
    <button
      className={`${defaultStyles} ${ButtonVariantStyles[variant]} ${ButtonSizeStyles[size]} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
