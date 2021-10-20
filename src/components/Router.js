import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CheerRegister from "../routes/CheerRegister";
import Community from "../routes/Community";
import Goal from "../routes/Goal";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Profile from "../routes/Profile";
import Register from "../routes/Register";
import Todos from "../routes/Todos";
import Navigation from "./Navigation";
import Signout from "./Signout";

const AppRouter = ({ isLoggedIn, userObj, targets, refreshUser }) => {
    return (
        <Router>
            <Route render={({ location }) => {
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
                                    <Route exact path="/cheerregister">
                                        <CheerRegister />
                                    </Route>
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
                                    {isLoggedIn ? (
                                    <>
                                        <Route exact path="/">
                                            <Home userObj={userObj} targets={targets} />
                                        </Route>
                                        <Route exact path="/goal">
                                            <Goal userObj={userObj} targets={targets} />
                                        </Route>
                                        <Route exact path="/todo">
                                            <Todos userObj={userObj} targets={targets} />
                                        </Route>
                                        <Route exact path="/community">
                                            <Community />
                                        </Route>
                                        <Route exact path="/profile">
                                            <Profile userObj={userObj} refreshUser={refreshUser} />
                                        </Route>
                                        <Route exact path="/signout">
                                            <Signout />
                                        </Route>
                                        <Navigation />
                                    </> 
                                    ) : ( 
                                    <>
                                        <Route exact path="/">
                                            <Register />
                                        </Route>
                                        <Redirect from="*" to="/" />       
                                    </>
                                    )}
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