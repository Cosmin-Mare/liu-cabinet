import { Appointment } from "@/components/appointment";
import { PatientProps } from "@/components/patient";
import * as dotenv from "dotenv";
import { MongoClient, ObjectId, PullOperator } from "mongodb";
dotenv.config();
const URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;
if (!URI || !DB_NAME) {
  throw new Error(
    "Please define the DB_URI and DB_NAME environment variables inside .env"
  );
}

const client = new MongoClient(URI);
const db = client.db(DB_NAME);

export async function getPatients() {
  const patients = db.collection("patients").find().toArray();
  return patients;
}

export async function addPatient(data: PatientProps) {
  await db.collection("patients").insertOne(data);
}

export async function deletePatient(id: string) {
  await db.collection("patients").deleteOne({ _id: new ObjectId(id) });
}

export async function getPatient(id: string) {
  const patient = db.collection("patients").findOne({ _id: new ObjectId(id) });
  return patient;
}

export async function updatePatient(data: PatientProps) {
  await db
    .collection("patients")
    .updateOne({ _id: new ObjectId(data.id) }, { $set: data });
}

export async function updatePatientField(data: {
  id: string;
  field: string;
  value: string;
}) {
  await db
    .collection("patients")
    .updateOne(
      { _id: new ObjectId(data.id) },
      { $set: { [data.field]: data.value } }
    );
}

export async function updateAppointmentField(data: {
  patientId: string;
  appointmentId: string;
  field: string;
  value: string;
}) {
  await db.collection("patients").updateOne(
    {
      _id: new ObjectId(data.patientId),
      "appointments.id": data.appointmentId,
    },
    { $set: { [`appointments.$.${data.field}`]: data.value } }
  );
}
export async function deleteAppointment(
  patientId: string,
  appointmentId: string
) {
  await db
    .collection("patients")
    .updateOne(
      { _id: new ObjectId(patientId) },
      { $pull: { appointments: { id: appointmentId } } as any }
    );
}
export async function addAppointment(patientId: string, data: Appointment) {
  await db
    .collection("patients")
    .updateOne(
      { _id: new ObjectId(patientId) },
      { $push: { appointments: data } as any }
    );
}
