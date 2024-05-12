export interface FieldProps {
  field: string;
  type: string;
}

export default function Field(props: FieldProps) {
  return (
    <div>
      <p className="field-name">{props.field}</p>
      <button className="button" onClick={() => {}}>
        <img src="edit.svg"></img>
      </button>
      <button className="button" onClick={() => {}}>
        <img src="delete.svg"></img>
      </button>
    </div>
  );
}
