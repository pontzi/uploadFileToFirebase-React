import React from "react";
import useUploadFile from "./useUploadFile";

const FileToUpload = () => {
  const [state, handleUpload, validationProcess] = useUploadFile();
  return (
    <div>
      <progress value={state.uploadValue} max="100">
        {" "}
      </progress>
      <br />
      <input className="inputFile" type="file" onChange={handleUpload} />
      {validationProcess()}
    </div>
  );
};

export default FileToUpload;
