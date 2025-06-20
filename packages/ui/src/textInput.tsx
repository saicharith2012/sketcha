"use client";

export const TextInput = ({
  placeholder,
  type,
}: {
  placeholder: string;
  type?: string;
}) => {
  return <input type={type || "text"} placeholder={placeholder} className="border p-2.5 m-2.5 focus:outline-none"></input>;
};
