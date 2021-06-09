import React from "react"
import Question from "../components/Question"
import "./Unhappy.css"

const Unhappy = (props) => {
    const {location : {state}} = props
    return <Question 
            ishappy = {state.ishappy}
            fortest = {state.fortest}
    />
}

export default Unhappy;