import { connect } from "@/app/dbConfig/dbConfig";
import User from "../../../models/userModels";
import keys from "../../../../config/config";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
var bcrypt = require("bcryptjs");
connect();

export async function POST(request: NextRequest) {
  const secretToken: string | undefined = keys.token;

  if (secretToken === undefined) {
    console.error("Secret key is undefined");
    process.exit(1); // Exit the process with a non-zero exit code
  }
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //check if password correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email password" },
        { status: 400 }
      );
    }
    //token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, secretToken, { expiresIn: "1d" });
    const response = NextResponse.json(
      { message: "User Login Successfully", success: true },
      { status: 201 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
