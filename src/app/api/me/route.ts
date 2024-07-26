import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { getDataFromToken } from "@/helpers/getToken";

connect();

const fetchpeers = async (token: string) => {
  try {
    const response = await fetch("https://peer-tracker.vercel.app/peers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data1 = await response.json();
    return data1.peers;
  } catch (error) {
    console.error("Error fetching peers:", error);
  }
};

const logintracker = async (uname: string, pass: string) => {
  const response = await fetch("https://peer-tracker.vercel.app/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: uname,
      password: pass,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const token = data.token;

  const peerarray = await fetchpeers(token);

  return peerarray; // Return the fetched data
};

export async function GET(req: NextRequest) {
  try {
    const userid = await getDataFromToken(req);
    if (userid === "not_logged_in") {
      return NextResponse.json(
        {
          message: "Please Login",
        },
        { status: 400 }
      );
    }
    const user = await User.findOne({ _id: userid });
    console.log(user);
    if (user) {
      const peerarray = await logintracker(user.username, user.password);
      return NextResponse.json(
        {
          message: "User Found",
          data: peerarray,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User NOT Found",
        },
        { status: 404 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: err,
      },
      { status: 500 }
    );
  }
}
