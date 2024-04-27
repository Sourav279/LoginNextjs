import { connect } from "@/app/dbConfig/dbConfig";
import User from "../../../models/userModels";
import { NextRequest, NextResponse } from "next/server";
var bcrypt = require("bcryptjs");

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;
    //user check if already exist
    const userEmailCheck = await User.findOne({ email });
    const userUsernameCheck = await User.findOne({ username });
    if (userEmailCheck || userUsernameCheck) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //new User

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
