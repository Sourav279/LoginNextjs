import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/app/models/userModels";
connect();
export async function GET(request: NextRequest) {
  try {
    const UserId = await getTokenData(request);
    const user = await User.findOne({ _id: UserId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
