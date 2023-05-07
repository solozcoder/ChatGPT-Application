import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/index.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
