import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
connect();

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Successfully",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}
