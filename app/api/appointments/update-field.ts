import { NextApiRequest, NextApiResponse } from "next";
import { updateAppointmentField } from "@/utils/mongodb";
import { Patient } from "@/components/patient";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
  try {
    const body = await req.json();
    await updateAppointmentField(body);
    NextResponse.json({ message: "Appointment updated" }, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
