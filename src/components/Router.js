import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Community from "../routes/Community";
import Goal from "../routes/Goal";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Profile from "../routes/Profile";
import Register from "../routes/Register";
import Navigation from "./Navigation";

const AppRouter = () => {
    return (
        <Router>
            <Route render={({ location }) => {
                console.log(location)
                return (
                        <TransitionGroup className="transition-group">
                            <CSSTransition key={location.pathname} timeout={500} classNames="fade">
                                <Switch location={location}>
                                    <Route exact path="/register">
                                        <Register />
                                    </Route>
                                    <Route exact path="/login">
                                        <Login />
                                    </Route>
                                    <Navigation />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    );
                }}>
            </Route>
            <Route render={({ location }) => {
                return (
                        <TransitionGroup className="transition-group">
                            <CSSTransition key={location.pathname} timeout={500} classNames="fade">
                                <Switch location={location}>
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
                            </CSSTransition>
                        </TransitionGroup>
                    );
                }}>
            </Route>
        </Router>
    )
}

export default AppRouter;