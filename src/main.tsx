import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import store, { persistor } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
