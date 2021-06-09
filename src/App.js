import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Happy from "./routes/Happy";
import Unhappy from "./routes/Unhappy";

function App() {
  return (
  <HashRouter>
    <Route path="/" exact={true} component={Home} />
    <Route path="/happy" component={Happy} />
    <Route path="/unhappy" component={Unhappy} />
  </HashRouter>
  )
}

export default App;