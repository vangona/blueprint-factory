import React from "react"
import Want from "../components/unhappy/Want"
import Feeling from "../components/unhappy/Feeling"
import Thinking from "../components/unhappy/Thinking"
import Doing from "../components/unhappy/Doing"
import "./Unhappy.css"

const Unhappy = (props) => {
    if (props.location.state.want === false) {
        return <Feeling 
                props= {props}
        />
    } else if (props.location.state.feeling === false) {
        return <Thinking 
                props= {props}
        />
    } else if (props.location.state.thinking === false) {
        return <Doing 
                props= {props}
        />
    }else {
        return (
            <Want 
                    props= {props}
            />
        )
    }
}

export default Unhappy;