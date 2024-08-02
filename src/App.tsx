import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Form from "./component/Form";
import Header from "./component/Header";

function App() {
  return (
    <div>
      <Header />
      <Form />
    </div>
  );
}

export default App;
