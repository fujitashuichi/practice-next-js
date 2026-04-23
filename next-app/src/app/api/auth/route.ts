import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  console.log("GET");

  return NextResponse.json({ message: "fetch test ok" });
}
