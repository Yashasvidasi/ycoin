"use client";

import { useState } from "react";
import LoginPage from "./LoginPage";
import SignInPage from "./SignInPage";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [login, setlogin] = useState(true);
  return (
    <main className="flex h-screen flex-row items-center justify-between p-5 border border-white">
      {/* Column 1 (hidden on mobile screens, visible on medium and larger) */}
      <div className="hidden md:flex flex-col justify-center w-1/2 border border-white h-full">
        logged in:
      </div>

      {/* Column 2 (full width on mobile, half width on medium and larger) */}
      <div className="flex flex-col w-full md:w-1/2 border border-white justify-center min-h-full">
        <Toaster />
        {login ? (
          <LoginPage setlogin={setlogin} />
        ) : (
          <SignInPage setlogin={setlogin} />
        )}
      </div>
    </main>
  );
}
