import React, { useEffect, useState } from "react";
import { authService } from "../fBase";
import AppRouter from "./Router";

const App = () => {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged(async (user) => {
            if (user) {
                setUserObj({
                    uid: user.uid,
                    displayName: (user.displayName ? user.displayName : "익명"),
                    updateProfile: (args) => user.updateProfile(args),
                });
                setInit(true);
            } else {
                setUserObj(null);
                setInit(true);
            }
        })
    }, [])

    const refreshUser = async () => {
        const user = authService.currentUser;
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      };

    return (
        <>
        {init 
        ? <AppRouter isLoggedIn={Boolean(userObj)} refreshUser={refreshUser} userObj={ userObj } /> 
        : "Loading..."
        }
        </>
    )
};
export default App;
