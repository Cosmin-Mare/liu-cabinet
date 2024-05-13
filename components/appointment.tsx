import { useRouter } from "next/router";
import React from "react";
import { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export interface Appointment {
  id: string;
  date: Date;
  details?: string;
}
export default function AppointmentComp(props: Appointment) {
  const [date, setDate] = useState<Date>();
  const [details, setDetails] = useState<string>();
  const editInputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<any>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      datePickerRef.current = false;
    }
    fetch("/api/appointments/update-field", {
      method: "POST",
      body: JSON.stringify({
        patientId: useRouter().query.id as string,
        appointmentId: props.id,
        field: "date",
        value: date,
      }),
    }).then((res) => {
      if (res.status === 200) {
        if (datePickerRef.current) {
          datePickerRef.current.disabled = false;
        }
      }
    });
  }, [date]);

  useEffect(() => {
    if (editButtonRef.current !== null) {
      editButtonRef.current.disabled = true;
      editButtonRef.current.innerHTML = "<img src='loading.gif'></img>";
    }
    fetch("/api/appointments/update-field", {
      method: "POST",
      body: JSON.stringify({
        patientId: useRouter().query.id as string,
        appointmentId: props.id,
        field: "details",
        value: "new details",
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
  }, [details]);

  function handleEdit() {
    if (editButtonRef.current !== null) {
      editButtonRef.current.innerHTML = "Save";
      editButtonRef.current.onclick = () => {
        setDetails(editInputRef.current?.value ?? "");
      };
    }
  }
  return (
    <div>
      <div></div>
      <div>
        <p>Data: </p>
        <DatePicker
          ref={datePickerRef}
          showTimeSelect
          timeIntervals={5}
          selected={date}
          onChange={(date) => setDate(date ?? undefined)}
        />
        {datePickerRef.current?.disabled && (
          <div>
            <img src="loading.gif"></img>
          </div>
        )}
      </div>
      <div>
        <p>Detalii: </p>
        <input disabled className="appointment-input" ref={editInputRef}>
          {details ?? "Niciun detaliu"}
        </input>
        <button onClick={handleEdit} className="btn edit" ref={editButtonRef}>
          Edit
        </button>
      </div>
    </div>
  );
}
