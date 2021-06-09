import React from "react";
import { HashRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./routes/Home";
import Happy from "./routes/Happy";
import Unhappy from "./routes/Unhappy";

function App() {
  return (
  <HashRouter>
    <Route path="/" exact={true} component={Home} />
    <PrivateRoute path="/happy" component={Happy} />
    <PrivateRoute path="/unhappy" component={Unhappy} />
  </HashRouter>
  )
}

export default App;