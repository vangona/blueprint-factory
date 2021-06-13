import React from "react"
import Question from "../components/unhappy/Question"
import Answer from "../components/Answer"
import Buttons from "../components/Buttons"
import "./Unhappy.css"

const Unhappy = (props) => {
    let page = "thinking"
    let isAnswer= false;

    const doing_list = localStorage.getItem('doing_happy_algorithm')
    const think_list = localStorage.getItem('thinking_happy_algorithm')
    const feel_list = localStorage.getItem('feeling_happy_algorithm')
    const want_list = localStorage.getItem('want_happy_algorithm')

    const things = [doing_list, think_list, feel_list, want_list]

    if (things[0] !== null || things[1] !== null || things[2] !== null || things[3] !== null) {
        isAnswer = true;
    } else {
        isAnswer = false;
    }

    if (props.location.state.page === "feeling") {
        page = "feeling"
    } else if (props.location.state.page === "doing") {
        page = "doing"
    } else if (props.location.state.page === "thinking") {
        page = "thinking"
    } else if (props.location.state.page === "want") {
        page = "want"
    } 

    return (
        <div className="main-container">
            <Question
                props= {props}
                page= {page}
            />
            {isAnswer
            ?<Answer 
                props= {props}
                page= {page}
            />
            : null}
            <Buttons 
                props= {props}
                page= {page}
            />
        </div>
        )
}

export default Unhappy;