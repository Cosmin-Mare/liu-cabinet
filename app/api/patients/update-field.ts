import { NextApiRequest, NextApiResponse } from "next";
import { updatePatientField, updatePatient } from "@/utils/mongodb";
import { Patient } from "@/components/patient";

type ResponseData = {
  message: string;
  patient?: Patient;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
  try {
    await updatePatientField(req.body);
    res.status(200).json({ message: "Patient updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
