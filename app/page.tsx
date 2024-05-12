import { useEffect } from "react";

export default function Home() {
  let patients = [];
  useEffect(() => {
    fetch("http://localhost:3000/patients")
      .then((response) => response.json())
      .then((data) => {
        patients = data;
      });
  });
  return (
    <main>
      <h1>Panou de control</h1>
      <p>
        De aici poți să modifici, să adaugi sau să ștergi datele pacienților
      </p>
    </main>
  );
}
