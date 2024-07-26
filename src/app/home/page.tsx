"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function page() {
  const [peers, setpeers] = useState([]);
  const router = useRouter();
  const notifyLogout = () => {
    const id = toast.loading("Logging out...");
    return id;
  };

  const dismissnotify = (tid: string) => {
    toast.dismiss(tid);
  };

  const fetchpeers = async () => {
    try {
      const response = await fetch("/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setpeers(data.data);
    } catch (error) {
      console.error("Error fetching peers:", error);
    }
  };

  useEffect(() => {
    fetchpeers();
  }, []);

  const handlelogout = async () => {
    try {
      const tid = notifyLogout();
      const response = await fetch(`/api/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success === true) {
        dismissnotify(tid);
        setTimeout(() => {
          router.replace("/");
        }, 100);
      }
    } catch (err) {}
  };
  return (
    <div className="flex flex-col h-screen w-screen">
      <button onClick={handlelogout}>logout</button>
      <div>
        {peers.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
      <Toaster />
    </div>
  );
}

export default page;
