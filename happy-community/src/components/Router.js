import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import CheerRegister from "../routes/CheerRegister";
import Community from "../routes/Community";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Profile from "../routes/Profile";
import Register from "../routes/Register";
import Todos from "../routes/Todos";
import GoalDetail from "./details/GoalDetail";
import Navigation from "./Navigation";
import Signout from "./Signout";

const AppRouter = ({ isLoggedIn, userObj, targets, refreshUser }) => {
    return (
        <Router>
            <Switch>
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
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/">
                        <Home userObj={userObj} targets={targets} />
                    </Route>
                    <Route exact path="/goal/:id">
                        <GoalDetail userObj={userObj} />
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
                    <Navigation userObj={userObj} />
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
        </Router>
    )
}

export default AppRouter;