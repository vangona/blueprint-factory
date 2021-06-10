import React from "react"
import What from "../components/happy/What"
import Plan from "../components/happy/Plan"
import "./Happy.css"
import { Redirect } from "react-router"

const Happy = (props) => {
    if ( props.location.state.what === true ) {
        return (
            <Plan 
                props= {props}
            />
        )
    } else if ( localStorage.getItem('plan_happy_algoritm') !== null) {
        return (
            <Redirect to="/result" />
        )
    }else {
        return (
            <What 
                    props= {props}
            />
        )
    }
}

export default Happy;