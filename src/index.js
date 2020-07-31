import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";

import App from "./App";

firebase.initializeApp({
  //Here you must insert your web app's Firebase configuration
});

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
