import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the request body
    const { email, password } = body;
    console.log(body);
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { message: "Username doesnt exists" },
        { status: 400 }
      );
    }

    if (user.isVerified === false) {
      return NextResponse.json(
        { message: "email_not_verified" },
        { status: 401 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ message: "Wrong Password" }, { status: 402 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    console.log(user._id);

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      {
        message: "Login Success",
        success: true,
        id: user._id,
        tracker: "ok",
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}
