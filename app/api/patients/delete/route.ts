import { NextApiRequest, NextApiResponse } from "next";
import { deletePatient } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await deletePatient(body);
    if (res.acknowledged === false) {
      return NextResponse.json(
        { message: "Failed to delete patient" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Patient deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
