import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ResultRoute from "./ResultRoute";
import Home from "./routes/Home";
import Happy from "./routes/Happy";
import Unhappy from "./routes/Unhappy";
import Result from "./routes/Result";

function App() {  
  function preventF5(e) {
    if (e.key === "F5")
      e.preventDefault()
  }
  window.addEventListener("keydown", (e => {preventF5(e)}))
  return (
    <BrowserRouter>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/happy" component={Happy} />
        <PrivateRoute path="/unhappy" component={Unhappy} />
        <ResultRoute path="/result" component={Result} />
    </BrowserRouter>
  )
}

export default App;