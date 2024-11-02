import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import 'assets/styles/global.css'
import {persistStore} from "redux-persist";

import store from "./store/store.js";
import App from "./App.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));

const persistor = persistStore(store);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);