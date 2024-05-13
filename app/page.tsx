"use client";
import PatientComp, { Patient } from "@/components/patient";
import { useEffect, useState } from "react";

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  function handleDelete(id: string) {
    setPatients(patients.filter((patient) => patient.id !== id));
  }
  useEffect(() => {
    // fetch("http://localhost:3000/patients")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPatients(data as Patient[]);
    //   });

    // Mock data
    setPatients([
      {
        id: "1",
        name: "John Doe",
        phone: "1234567890",
        email: "example.email",
      },
      {
        id: "2",
        name: "Jane Doe",
        phone: "0987654321",
        email: "example.email",
      },
    ]);
  });
  return (
    <main>
      <h1>Panou de control</h1>
      <p>
        De aici poți să modifici, să adaugi sau să ștergi datele pacienților
      </p>
      <div>
        {patients.map((patient) => (
          <PatientComp {...{ ...patient, _handleDelete: handleDelete }} />
        ))}
      </div>
    </main>
  );
}
