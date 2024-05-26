import { addPatient } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const res = await addPatient(body);
    if (res.acknowledged === false) {
      return NextResponse.json(
        { message: "Failed to add patient" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Patient added" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
