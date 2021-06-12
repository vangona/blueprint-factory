import React from "react"
import Want from "../components/unhappy/Want"
import Feeling from "../components/unhappy/Feeling"
import Thinking from "../components/unhappy/Thinking"
import Doing from "../components/unhappy/Doing"
import "./Unhappy.css"

const Unhappy = (props) => {
    if (props.location.state.page === "feeling") {
        return <Feeling 
                    props= {props}
                    page= "feeling"
        />
    } else if (props.location.state.page === "doing") {
        return <Doing 
                    props= {props}
                    page= "doing"
        />
    } else if (props.location.state.page === "thinking") {
        return <Thinking 
                    props= {props}
                    page= "thinking"
        />
    } else if (props.location.state.page === "want") {
        return <Want 
                    props= {props}
                    page= "want"
        />
    } else {
        return (
            <Thinking 
                    props= {props}
                    page= "thinking"
            />
        )
    }
}

export default Unhappy;