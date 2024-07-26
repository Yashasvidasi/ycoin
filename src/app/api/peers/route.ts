import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

let peers: string[] = [];

const fetchpeers = async () => {
  try {
    const response = await fetch("https://peer-tracker.vercel.app/peers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data1 = await response.json();
    console.log(">>>>", data1);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error fetching peers:", error);
  }
};

export async function GET(req: NextRequest) {
  try {
    fetchpeers();
    return NextResponse.json({ peers: "" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
