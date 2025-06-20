"use client";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";

export default function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="px-4 py-8 m-4 bg-white rounded flex flex-col items-center border">
        {!isSignin && <TextInput placeholder="email" type="email" />}
        <TextInput placeholder="username" />
        <TextInput placeholder="password" type="password" />
        <Button onClick={() => {}} size="md" variant="primary">
          {isSignin ? "Sign in" : "Sign up"}
        </Button>
      </div>
    </div>
  );
}
