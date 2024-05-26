"use client";
import AddPatientPopup from "@/components/addPatientPopup";
import PatientComp, { Patient } from "@/components/patient";
import { useEffect, useState } from "react";

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showAddPatient, setShowAddPatient] = useState<boolean>(false);
  function handleDelete(id: string) {
    setPatients(patients.filter((patient) => patient.id !== id));
  }
  function handleAddPatient(patient: Patient) {
    setPatients([...patients, patient]);
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
  }, []);
  return (
    <main>
      <h1>Panou de control</h1>
      <p>
        De aici poți să modifici, să adaugi sau să ștergi datele pacienților
      </p>
      <button className="add btn" onClick={() => setShowAddPatient(true)}>
        Adaugă pacient
      </button>

      {showAddPatient && (
        <AddPatientPopup
          handleAddPatient={handleAddPatient}
          handleClose={() => setShowAddPatient(false)}
        />
      )}

      <div>
        {patients.map((patient) => (
          <PatientComp
            {...{ ...patient, _handleDelete: handleDelete }}
            key={patient.id}
          />
        ))}
      </div>
    </main>
  );
}
