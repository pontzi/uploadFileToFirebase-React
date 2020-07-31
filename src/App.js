import React from "react";
import "./App.css";
import FileToUpload from "./FileToUpload";

const App = () => {
  return (
    <div className="App">
      <header>
        <h2>Upload a file</h2>
      </header>
      <FileToUpload />
    </div>
  );
};

export default App;
