import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { authService } from "../fBase";

const Signout = () => {
    const history = useHistory();
    
    useEffect(() => {
        authService.signOut();
        setTimeout(() => {
            history.push("/")
        })
    }, [])
    return (
        <div>
            Signout
        </div>
    )
}

export default Signout;