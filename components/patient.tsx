import Field from "./field";

export interface PatientProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  details: string;
}

export default function Pacient(props: PatientProps) {
  return (
    <a href={`/pacient/${props.id}`}>
      <div>
        <Field field={props.name} type="name" />
        <Field field={props.phone} type="phone" />
        <Field field={props.email} type="email" />
        <Field field={props.details} type="details" />
      </div>
    </a>
  );
}
