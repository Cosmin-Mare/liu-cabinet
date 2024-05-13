import { useRef } from "react";

export interface FieldProps {
  value: string;
  type: string;
  id: string;
}

export default function Field(props: FieldProps) {
  const editButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <p className="field-name">{props.type}:</p>
      <p className="field-value">{props.value}</p>
    </div>
  );
}
