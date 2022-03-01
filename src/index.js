import React from "react";
import ReactDOM from "react-dom";
import { Reset } from "styled-reset";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./components/App";
import "./styles.css";
import * as serviceWorker from "./serviceWorkerRegistration";

Sentry.init({
  dsn: "https://5564f12ab54c4c8385cc9c046072be54@o1065943.ingest.sentry.io/6151464",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <>
    <Reset />
    <App />
  </>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  serviceWorker.register();
}
