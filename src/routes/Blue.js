import React from "react"
import "./Blue.css"

const Blue = (props) => {
    const {location, history} = props
    if (location.state === undefined){
        history.push("/")
        return ""
    } else {
    return (
        <div>
            우울
        </div>
    )}
}

export default Blue;