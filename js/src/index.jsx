import "uno.css";
import "./pulp.css";
import "@unocss/reset/tailwind.css";
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root")
);
