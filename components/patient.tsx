import { redirect } from "next/navigation";
import { useRef } from "react";
import { Appointment } from "./appointment";

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  details?: string;
  appointments?: Appointment[];
}

interface PatientProps extends Patient {
  _handleDelete: (id: string) => void;
}

export default function PatientComp(props: PatientProps) {
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  async function handleDelete() {
    if (deleteButtonRef.current !== null) {
      deleteButtonRef.current.disabled = true;
      deleteButtonRef.current.innerHTML = "<img src='loading.gif'></img>";
    }
    let response = await fetch(`/api/patients/delete`, {
      method: "POST",
      body: JSON.stringify({
        id: props.id,
      }),
    });
    if (response.status === 200) {
      props._handleDelete(props.id);
    }
  }
  return (
    <div>
      <div>
        <div>
          <p>Nume: </p>
          <p>{props.name}</p>
        </div>
        <div>
          <p>Telefon: </p>
          <p>{props.phone}</p>
        </div>
        <div>
          <p>Email: </p>
          <p>{props.email ?? ""}</p>
        </div>
        <div>
          <p>Detalii: </p>
          <p>{props.details ?? "Niciun detaliu"}</p>
        </div>
      </div>
      <div>
        <button
          className="button"
          onClick={() => {
            redirect(`/pacienti/${props.id}`);
          }}
        >
          Edit
        </button>
      </div>
      <div>
        <button className="button" onClick={handleDelete} ref={deleteButtonRef}>
          Delete
        </button>
      </div>
    </div>
  );
}
