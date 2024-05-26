import { NextApiRequest, NextApiResponse } from "next";
import { updatePatientField } from "@/utils/mongodb";
import { Patient } from "@/components/patient";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await updatePatientField(body);
    if (res.acknowledged === false) {
      return NextResponse.json(
        { message: "Failed to update patient" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Patient updated" }, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
