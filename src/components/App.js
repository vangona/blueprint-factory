import React, { useEffect, useState } from "react";
import { authService } from "../fBase";
import AppRouter from "./Router";

const App = () => {
    const [init, setInit] = useState(false)
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user)
            } else {
                setUserObj(null);
            }
            setInit(true)
        })
    }, [])
    return (
        <>
        {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={ userObj } /> : "Loading..."}
        </>
    )
};
export default App;
