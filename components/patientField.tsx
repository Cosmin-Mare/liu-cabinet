import { useRouter } from "next/router";
import { useRef } from "react";

export interface FieldProps {
  value: string;
  type: string;
}

export default function PatientField(props: FieldProps) {
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useRouter().query;

  function handleEdit() {
    if (editButtonRef.current !== null) {
      editButtonRef.current.innerHTML = "Save";
      editButtonRef.current.onclick = handleSave;
    }
    // Enable the input
    if (inputRef.current !== null) {
      inputRef.current.disabled = false;
    }
  }

  function handleSave() {
    if (editButtonRef.current !== null) {
      editButtonRef.current.disabled = true;
      editButtonRef.current.innerHTML = "<img src='loading.gif'></img>";
    }

    fetch(`/api/patients/update-field`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        field: props.type,
        value: inputRef.current?.value,
      }),
    }).then((response) => {
      if (response.status === 200) {
        // Reload the page
        window.location.reload();
      }
    });

    if (editButtonRef.current !== null) {
      editButtonRef.current.innerHTML = "Edit";
      editButtonRef.current.onclick = handleEdit;
    }
    // Disable the input
    if (inputRef.current !== null) {
      inputRef.current.disabled = true;
    }
  }
  return (
    <div>
      <p className="field-name">
        {props.type === "name"
          ? "nume"
          : props.type === "phone"
          ? "telefon"
          : props.type === "details"
          ? "detalii"
          : "email"}
        :
      </p>
      <input disabled className="field-value" ref={inputRef}>
        {props.value}{" "}
      </input>
      <button ref={editButtonRef} className="button" onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
}
