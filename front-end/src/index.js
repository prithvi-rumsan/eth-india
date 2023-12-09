import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Web3ReactProvider } from "@web3-react/core";


import "./index.css";
import App from "./App";
import Web3 from "web3";

//library to connect to metamask
function getLibrary(provider) {
  const library = new Web3(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Web3ReactProvider>,
  document.getElementById("root")
);
