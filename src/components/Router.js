import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../router/Auth";
import BlueprintMaker from "../router/BlueprintMaker";
import Home from "../router/Home";
import Longterm from "./targets/Longterm";
import Plan from "./targets/Plan";
import Routine from "./targets/Routine";
import Shortterm from "./targets/Shortterm";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            <Routes>
                {isLoggedIn
                ? 
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/blueprint/maker" element={<BlueprintMaker userObj={userObj} />} />
                    <Route path="/blueprint/:id" element={<BlueprintMaker userObj={userObj} />} />
                    <Route path="/blueprint/maker/:id" element={<BlueprintMaker userObj={userObj} />} />

                    <Route path="/blueprint/longterm/:id" element={<Longterm userObj={userObj} />} />
                    <Route path="/blueprint/shortterm/:id" element={<Shortterm userObj={userObj} />} />
                    <Route path="/blueprint/plan/:id" element={<Plan userObj={userObj} />} />
                    <Route path="/blueprint/routine/:id" element={<Routine userObj={userObj} />} />
                </>
                : 
                    <Route path="/" element={<Auth />} />
                }
                
            </Routes>
        </Router>
    )
}

export default AppRouter;