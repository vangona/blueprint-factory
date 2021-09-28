import React, { useEffect, useState } from "react";
import { authService, messaging } from "../fBase";
import AppRouter from "./Router";
import "../css/styles.css"
import Loading from "./Loading";
import { setToken } from "./Messaginginit";

const App = () => {
    const [init, setInit] = useState(false)
    const [userObj, setUserObj] = useState(null);

    const requestToken = async () => {
        let token = await setToken();
        console.log('token === ', token)
    }

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user)
            } else {
                setUserObj(null);
            }
            setInit(true)
        })
        requestToken();
        window.addEventListener("RemoteMessage", (payload) => {
            console.log(payload)
        })
    }, [])
    return (
        <>
        {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={ userObj } /> : <Loading />}
        </>
    )
};
export default App;
