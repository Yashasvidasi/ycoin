"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = ({ params }: { params: any }) => {
  const [token, setToken] = useState("");
  const notifyFailure = () => toast("Invalid token");
  const notifySuccess = () =>
    toast("Verification Success redirecting you in 5 seconds..");
  const router = useRouter();

  useEffect(() => {
    const retrievedToken = window.location.search.split("=")[1];
    setToken(retrievedToken);
  }, []);

  const handlesubmit = async () => {
    try {
      const response = await fetch(`/api/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const data = await response.json();

      if (data.success === true) {
        notifySuccess();
        console.log();
        setTimeout(() => {
          router.replace("/");
        }, 5000);
        return;
      } else {
        notifyFailure();
        return;
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-4xl mb-10">Email Verification</div>
      <button
        className="border border-white hover:border-black rounded-lg p-2 hover:bg-slate-300 hover:text-black"
        onClick={handlesubmit}
      >
        Click to verify
      </button>
      <Toaster />
    </main>
  );
};

export default Page;
