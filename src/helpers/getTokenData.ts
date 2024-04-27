import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";
import keys from "../config/config";
export const getTokenData = (request: NextRequest) => {
  const secretToken: string | undefined = keys.token;

  if (secretToken === undefined) {
    console.error("Secret key is undefined");
    process.exit(1); // Exit the process with a non-zero exit code
  }

  try {
    const token = request.cookies.get("token")?.value || "";
    const user: any = Jwt.verify(token, secretToken!);
    return user.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
