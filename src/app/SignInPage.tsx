"use client";
import React, { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

function SignInPage({ setlogin }: { setlogin: (arg0: boolean) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [reppassword, setreppassword] = useState("");

  const notifySuccess = () =>
    toast.success("Email Verification Sent", { duration: 3000 });
  const notifyFailure = () =>
    toast("Something went Wrong Please try again later");

  const notifySent = () => {
    const toastId = toast.loading("Loading...");
    return toastId;
  };

  const dismissToast = (id: any) => {
    toast.dismiss(id);
  };

  const handlesubmitsignin = async () => {
    try {
      const toastId = notifySent();
      const response = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      dismissToast(toastId);
      if (data.success === true) {
        notifySuccess();
        setlogin(true);
      } else {
        notifyFailure();
      }

      setUsername("");
      setPassword("");
      setEmail("");
      setreppassword("");

      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  return (
    <div>
      <div className="p-12 px-24 border border-yellow-400 flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <div className="flex flex-col space-y-4">
          {/* Username or Email Input */}
          <div className="border-white rounded-md overflow-hidden text-black hover:border-blue-600 border-4">
            <input
              type="text"
              value={username}
              placeholder="Username or Email"
              className="w-full p-3 text-bl focus:outline-none"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          {/*Email input*/}
          <div className="border-white rounded-md overflow-hidden text-black hover:border-blue-600 border-4">
            <input
              type="text"
              value={email}
              placeholder="Username or Email"
              className="w-full p-3 text-bl focus:outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* Password Input */}
          <div className=" border-white rounded-md overflow-hidden text-black hover:border-blue-600 border-4">
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="w-full p-3 focus:outline-none"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className=" border-white rounded-md overflow-hidden text-black hover:border-blue-600 border-4">
            <input
              type="password"
              value={reppassword}
              placeholder="Password"
              className="w-full p-3 focus:outline-none"
              onChange={(e) => {
                setreppassword(e.target.value); //setEmail
              }}
            />
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 cursor-pointer transition duration-300"
            onClick={() => {
              handlesubmitsignin();
            }}
          >
            Log In
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8">
          <div className="text-sm">
            Already Have an account?{" "}
            <div
              onClick={() => {
                setlogin(true);
              }}
              className="text-blue-500 hover:underline hover:cursor-pointer"
            >
              Log in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
