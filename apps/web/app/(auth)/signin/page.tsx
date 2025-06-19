"use client";
import axios from "axios";
import { useRef } from "react";
import { httpBackendUrl } from "../../../config";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input type="text" placeholder="username"></input>
      <input type="password" placeholder="password"></input>
      <button
        onClick={async () => {
          const response = await axios.post(`${httpBackendUrl}/user/signin`, {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
          });

          console.log(response.data.message);
          localStorage.setItem("token", response.data.token);
          router.push("/");
        }}
      >
        Sign in
      </button>
    </div>
  );
}
