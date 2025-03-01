import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeflex/primeflex.css"; // Flex utilities

function App() {
  const [name, setName] = useState("");

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">React + Vite + PrimeReact</h1>
      <div className="p-fluid mt-3">
        <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        <Button label="Submit" className="mt-2" />
      </div>
    </div>
  );
}

export default App;