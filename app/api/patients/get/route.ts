import { Patient } from "@/components/patient";
import { getPatients } from "@/utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest) {
  try {
    const patients = (await getPatients()).flatMap((patient) => {
      return {
        id: patient._id.toString(), // Convert id to number
        name: patient.name,
        phone: patient.phone,
        email: patient.email,
        details: patient.details,
        appointments: patient.appointments,
      } as Patient;
    });
    NextResponse.json({ message: "Success", patients }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
