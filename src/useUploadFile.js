import React, { useState } from "react";
import firebase from "firebase";
import Compressor from "compressorjs"; //To compress any image
import JSZip from "jszip"; //To compress any other file that is different from an image

const useUploadFile = () => {
  const [state, setState] = useState({
    uploadValue: 0,
    error: null,
    loading: false,
    file: null,
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (file.type.includes("image")) {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          const storageRef = firebase.storage().ref(`/files/${result.name}`);
          const task = storageRef.put(result);

          task.on(
            "state_changed",
            (snapshot) => {
              let percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setState({
                ...state,
                loading: true,
                uploadValue: percentage,
                file: null,
              });
            },
            (error) =>
              setState({
                ...state,
                loading: false,
                uploadValue: 0,
                error: error,
              }),
            () =>
              setState({
                ...state,
                loading: false,
                file: true,
              })
          );
        },
        error(err) {
          setState({
            ...state,
            loading: false,
            uploadValue: 0,
            error: err,
          });
        },
      });
    } else {
      const file = e.target.files[0];
      let zip = new JSZip();

      zip.file(file.name, file);

      const mainFileName = file.name;
      const indexBeforeExtension = mainFileName.indexOf(".");
      const fileNameWithoutExtension = mainFileName.substring(
        0,
        indexBeforeExtension
      );

      zip
        .generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            level: 9,
          },
        })
        .then((content) => {
          const storageRef = firebase
            .storage()
            .ref(`/files/${fileNameWithoutExtension}.zip`);
          const task = storageRef.put(content);

          task.on(
            "state_changed",
            (snapshot) => {
              let percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setState({
                ...state,
                file: null,
                loading: true,
                uploadValue: percentage,
              });
            },
            (error) =>
              setState({
                ...state,
                loading: false,
                uploadValue: 0,
                error: error,
              }),
            () =>
              setState({
                ...state,
                loading: false,
                file: true,
              })
          );
        });
    }
  };
  const validationProcess = () => {
    if (state.file)
      return <p className="message">The file was uploaded successfully!</p>;
    if (state.error) return <p className="message">Something went wrong!</p>;
    if (state.loading) return <p className="message">Uploading file...</p>;
  };
  return [state, handleUpload, validationProcess];
};

export default useUploadFile;
