import React from "react"
import "./Happy.css"

const Happy = (props) => {
    const ishappy = localStorage.getItem('ishappy')
    const {location} = props
    let happy = ""
    if (ishappy) {
        happy = "yes"
    } else {
        happy = "no"
    }
    return (
        <div>
            <div>{ happy }</div>
            <div>{ location.state.fortest }</div>
        </div>
    )
}

export default Happy;