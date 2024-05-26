import { FormEvent } from "react";
import { Patient } from "./patient";

interface AddPatientPopupProps {
  handleAddPatient: (patient: Patient) => void;
  handleClose: () => void;
}

export default function AddPatientPopup(props: AddPatientPopupProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const patient = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      details: formData.get("details"),
    } as Patient;
    fetch("/api/patients/add", {
      method: "POST",
      body: JSON.stringify({
        ...patient,
      }),
    }).then((response) => {
      if (response.status === 200) {
        // Reload the page
        props.handleAddPatient(patient);
      }
    });
  }
  return (
    <div className="popup">
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Details:
          <input type="text" name="details" />
        </label>
        <button type="submit">Add</button>
      </form>
      <button className="close-popup" onClick={props.handleClose}>
        X
      </button>
    </div>
  );
}
