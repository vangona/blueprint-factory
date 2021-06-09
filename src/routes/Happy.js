import React from "react"
import "./Happy.css"

const Happy = (props) => {
    const {location, history} = props
    if (location.state === undefined){
        history.push("/")
        return ""
    } else {
    let happy = ""
    if (location.state.ishappy) {
        happy = "yes"
    } else {
        happy = "no"
    }
    return (
        <div>
            <div>{ happy }</div>
            <div>{ location.state.fortest }</div>
        </div>
    )}
}

export default Happy;