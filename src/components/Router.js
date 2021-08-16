import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Community from "../routes/Community";
import Goal from "../routes/Goal";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = () => {
    return (
        <Router>
            <Navigation />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/goal">
                    <Goal />
                </Route>
                <Route exact path="/community">
                    <Community />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter;