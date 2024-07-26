import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { sendEmail } from "@/helpers/mailer";
const crypto = require("crypto");
const EC = require("elliptic").ec,
  ec = new EC("secp256k1");

connect();

export function GET() {
  return NextResponse.json({ message: "nothing to get" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the request body
    const { username, email, password } = body;
    console.log(body);
    const user = await User.findOne({ username });

    if (user) {
      return NextResponse.json({ message: "Username exists" }, { status: 400 });
    }

    const generateHash = (input: string) => {
      return crypto.createHash("sha256").update(input).digest("hex");
    };

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const hashstring = generateHash(hashedPassword + Date.now().toString());
    const keyPair = ec.keyFromPrivate(hashstring, "hex");
    const publicKey = keyPair.getPublic("hex");

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      user_address: publicKey,
    });

    const saveduser = await newUser.save();
    console.log(saveduser);

    //send verification email

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: saveduser._id,
      user_address: publicKey,
      user_private: hashstring,
    });
    return NextResponse.json({
      message: "User registration success",
      success: true,
      saveduser,
    });
  } catch (err) {
    console.error("Error verifying user:", err);
    return NextResponse.json(
      { error: "Failed to verify user" },
      { status: 500 }
    );
  }
}
