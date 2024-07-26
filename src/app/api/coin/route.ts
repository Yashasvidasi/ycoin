import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({ message: "got" }, { status: 300 });
  } catch (err) {
    console.log(err);
  }
}
