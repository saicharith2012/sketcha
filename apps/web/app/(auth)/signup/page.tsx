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
      <input ref={emailRef} type="email" placeholder="email"></input>
      <input ref={usernameRef} type="text" placeholder="username"></input>
      <input ref={passwordRef} type="password" placeholder="password"></input>
      <input type="password" placeholder="confirm password"></input>
      <button
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
