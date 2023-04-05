import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store"

import ToggleColorModeProvider from "./utils/ToggleColorMode";
// theme.palette.mode = "dark"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToggleColorModeProvider>
    </Provider>
  </React.StrictMode>
);


// Provider (wrap) -> 
// create store (import configureStore function and pass the reducer to it) -> 
// reducer is a service -> 
// service that uses redux toolkit query -> 
// specify reducer name -> 
// base query -> specify endpoints -> 
// redux toolkit automatically creates query for us -> 
// now simply this call this query and use it.