import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../router/Auth";
import BlueprintMaker from "../router/BlueprintMaker";
import Home from "../router/Home";
import PlanFactory from "./factory/PlanFactory";
import RoutineFactory from "./factory/RoutineFactory";
import TargetFactory from "./factory/TargetFactory";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            <Routes>
                {isLoggedIn
                ? 
                <>
                    <Route path="/" element={<Home userObj={userObj} />} />
                    <Route path="/blueprint/maker" element={
                        <BlueprintMaker userObj={userObj} />
                    } />
                    <Route path="/blueprint/edit/:id" element={
                        <BlueprintMaker userObj={userObj} />
                    } />
                    <Route path="/blueprint/targets/:id" element={
                        <TargetFactory userObj={userObj} />
                    } />
                    <Route path="/blueprint/plan/:id" element={
                        <PlanFactory userObj={userObj} />
                    } />
                    <Route path="/blueprint/routine/:id" element={
                        <RoutineFactory userObj={userObj} />
                    } />
                </>
                : 
                    <Route path="/" element={<Auth />} />
                }
                
            </Routes>
        </Router>
    )
}

export default AppRouter;