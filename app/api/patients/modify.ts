import { NextApiRequest, NextApiResponse } from "next";
import { updatePatient } from "@/utils/mongodb";

type ResponseData = {
  message: string;
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
    await updatePatient(req.body);
    res.status(200).json({ message: "Patient added" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
