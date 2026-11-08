import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
    ModuleRegistry,
    AllCommunityModule,
} from "ag-grid-community";

import "leaflet/dist/leaflet.css";

import { AppProvider } from "./context/appcontext";
import App from "./App";
import "./index.css";

// Register AG Grid Community modules
ModuleRegistry.registerModules([
    AllCommunityModule,
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>
);