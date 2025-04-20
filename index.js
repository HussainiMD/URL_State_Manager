import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./src/components/App";

const appElem = document.querySelector('.app');
const root = createRoot(appElem);
root.render(<App/>);