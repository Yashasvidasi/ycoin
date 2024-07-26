"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function LoginPage({ setlogin }: { setlogin: (arg0: boolean) => void }) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const notifysuccess = () => {
    toast.success("Success", { duration: 1800 });
  };

  const notifySent = () => {
    const toastId = toast.loading("Loading...");
    return toastId;
  };

  const notifyVerify = () => {
    toast.error("Please Verify your email", { duration: 2000 });
  };

  const notifyFailure = () => {
    toast.error("Wrong Credentials", { duration: 3000 });
  };

  const notifyServerError = () => {
    toast("Internal Server Error");
  };

  const dismissToast = (id: any) => {
    toast.dismiss(id);
  };

  const handlesubmitlogin = async () => {
    try {
      const notifySentid = notifySent();
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log("sent", email, password);
      const data = await response.json();
      dismissToast(notifySentid);
      if (data.success === true) {
        notifysuccess();
        setTimeout(() => {
          router.replace(`/home`);
        }, 2000);
      }

      if (response.status === 401) {
        notifyVerify();
        return;
      }

      if (response.status === 402 || response.status === 400) {
        notifyFailure();
        return;
      }

      if (response.status === 500) {
        notifyServerError();
        return;
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  return (
    <div>
      <div className="p-12 px-24 border border-yellow-400 flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Log In</h2>
        <div className="flex flex-col space-y-4">
          {/* email or Email Input */}
          <div className="border-white rounded-md overflow-hidden text-black hover:border-blue-600 border-4">
            <input
              type="text"
              value={email}
              placeholder="Email"
              className="w-full p-3 text-bl focus:outline-none"
              onChange={(e) => {
                setemail(e.target.value);
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

          {/* Log In Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 cursor-pointer transition duration-300"
            onClick={() => {
              handlesubmitlogin();
            }}
          >
            Log In
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8">
          <div className="text-sm">
            Dont have an account?{" "}
            <div
              onClick={() => {
                setlogin(false);
              }}
              className="text-blue-500 hover:underline hover:cursor-pointer"
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
