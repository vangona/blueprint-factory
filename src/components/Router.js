import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "router/Auth";
import BlueprintMaker from "router/BlueprintMaker";
import Home from "router/Home";
import BlueprintEditor from "router/BlueprintEditor";
import Navigation from "router/Navigation";
import Community from "router/Community";
import Blueprint from "router/Blueprint";
import Setting from "router/Setting";
import SomeonesBlueprint from "router/SomeonesBlueprint";
import NotFound from "components/error/NotFound";
import FindValue from "router/FindValue";
import Shop from "router/Shop";
import Signout from "components/Signout";
import MvpWelcome from "router/MvpWelcome";
import MvpBlueprint from "router/MvpBlueprint";

function AppRouter({ isLoggedIn, userObj }) {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/welcome"
              element={<MvpWelcome />}
            />
            <Route
              path="/mvp"
              element={<MvpBlueprint />}
            />
            <Route path="/value" element={<FindValue />} />
            <Route
              path="/community"
              element={<Community userObj={userObj} />}
            />
            <Route
              path="/shop"
              element={<Shop userObj={userObj} />}
            />
            <Route path="/blueprint" element={<Blueprint userObj={userObj} />} />
            <Route path="/setting" element={<Setting userObj={userObj} />} />
            {/* <Route
              path="/shop"
              element={<CalendarRoute userObj={userObj} />}
            /> */}
            <Route
              path="/:id/blueprint"
              element={<SomeonesBlueprint userObj={userObj} />}
            />
            <Route
              path="/blueprint/:type"
              element={<BlueprintMaker userObj={userObj} />}
            />
            <Route
              path="/blueprint/edit/:type/:id"
              element={<BlueprintEditor userObj={userObj} />}
            />
            <Route
              path="/blueprint/:type/:id"
              element={<BlueprintMaker userObj={userObj} />}
            />
            <Route path="/signout" element={<Signout />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
