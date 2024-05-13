import { useRef } from "react";
import Field from "./field";

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  details?: string;
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
    <a href={`/pacient/${props.id}`}>
      <div>
        <Field value={props.name} type="name" id={props.id} />
        <Field value={props.phone} type="phone" id={props.id} />
        <Field value={props.email} type="email" id={props.id} />
        <Field
          value={props.details ?? "Niciun detaliu"}
          type="details"
          id={props.id}
        />
      </div>
      <div>
        <button className="button" onClick={handleDelete} ref={deleteButtonRef}>
          Delete
        </button>
      </div>
    </a>
  );
}
