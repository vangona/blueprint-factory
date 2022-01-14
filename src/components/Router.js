import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../router/Auth";
import BlueprintMaker from "../router/BlueprintMaker";
import Home from "../router/Home";
import BlueprintEditor from "../router/BlueprintEditor";
import Signout from "./Signout";
import Navigation from "../router/Navigation";
import Community from "../router/Community";
import Blueprint from "../router/Blueprint";
import Setting from "../router/Setting";
import CalendarRoute from "../router/CalendarRoute";
import SomeonesBlueprint from "../router/SomeonesBlueprint";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn
                ? 
                <>
                    <Route path="/" element={<Home userObj={userObj} />} />
                    <Route path="/community" element={
                        <Community userObj={userObj} />
                    } />
                    <Route path="/blueprint" element={
                        <Blueprint userObj={userObj} />
                    } />         
                    <Route path="/setting" element={
                        <Setting userObj={userObj} />
                    } />
                    <Route path="/calendar" element={
                        <CalendarRoute userObj={userObj} />
                    } />                                
                    <Route path="/:id/blueprint" element={
                        <SomeonesBlueprint userObj={userObj} />
                    } />   
                    <Route path="/blueprint/:type" element={
                        <BlueprintMaker userObj={userObj} />
                    } />
                    <Route path="/blueprint/edit/:type/:id" element={
                        <BlueprintEditor userObj={userObj} />
                    } />
                    <Route path="/blueprint/:type/:id" element={
                        <BlueprintMaker userObj={userObj} />
                    } />
                    <Route path="/signout" element={
                        <Signout />
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