import PatientField from "@/components/patientField";
import { Patient } from "@/components/patient";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = useState<Patient>();
  useEffect(() => {
    if (id !== undefined) {
      fetch(`/api/patients/get`, {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setPatient(data as Patient);
        });
    }
  }, [id]);
  function handleUpdate(type: string, value: string) {
    if (patient === undefined) return;
    setPatient({ ...patient, [type]: value });
  }
  function handleDelete() {
    fetch(`/api/patients/delete`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    }).then((response) => {
      if (response.status === 200) {
        // Show confirmation popup
        alert("Pacientul a fost șters");
        // Redirect to the main page
        redirect("/");
      }
    });
  }

  return (
    <main>
      {patient === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div>
            <PatientField type="name" value={patient.name} />
            <PatientField type="phone" value={patient.phone} />
            <PatientField type="email" value={patient.email ?? ""} />
            <PatientField
              type="details"
              value={patient.details ?? "Niciun detaliu"}
            />
          </div>
          <div>
            <button className="btn delete" onClick={handleDelete}>
              Șterge
            </button>
          </div>
          <div></div>
        </div>
      )}
    </main>
  );
}
