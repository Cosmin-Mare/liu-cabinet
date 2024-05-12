import { PatientProps } from "@/components/patient";
import { getPatients } from "@/utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  patientProps: Array<PatientProps>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed", patientProps: [] });
    return;
  }
  try {
    const patientProps = (await getPatients()).flatMap((patient) => {
      return {
        id: patient._id.toString(), // Convert id to number
        name: patient.name,
        phone: patient.phone,
        email: patient.email,
        details: patient.details,
      } as PatientProps;
    });
    res.status(200).json({ message: "Success", patientProps });
  } catch (error) {
    res.status(500).json({ message: "Server error", patientProps: [] });
  }
}
