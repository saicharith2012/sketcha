"use client";
import axios from "axios";
import { useRef } from "react";
import { httpBackendUrl } from "../../../config";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input className="p-2.5 border m-2.5" ref={emailRef} type="email" placeholder="email"></input>
      <input className="p-2.5 border m-2.5" ref={usernameRef} type="text" placeholder="username"></input>
      <input className="p-2.5 border m-2.5" ref={passwordRef} type="password" placeholder="password"></input>
      <input className="p-2.5 border m-2.5" type="password" placeholder="confirm password"></input>
      <button className="border px-5 py-2.5 cursor-pointer"
        onClick={async () => {
          const response = await axios.post(`${httpBackendUrl}/user/signup`, {
            email: emailRef.current?.value,
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
          });

          console.log(response.data.message);
          router.push("/signin");
        }}
      >
        Sign up
      </button>
    </div>
  );
}
