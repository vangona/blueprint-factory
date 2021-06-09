import React, {useState} from "react"
import { Redirect } from "react-router";
import Feeling from "./Feeling"
import "./Question.css"

function useInput(defaultValue) {
    const [value, setValue] = useState(defaultValue);

    const onChange = e => {
        const {
            target: { value }
        } = e;
        setValue(value);
    };

    return { value, onChange };
}

function Question({fortest}) {
    const ishappy = localStorage.getItem('ishappy')

    function handleEnter(e) {
        if (e.key === "Enter") {
            if (e.target.value === ""){
                return <Feeling 
                    ishappy= {ishappy}
                />
            } else if (e.target.value === "죽음" || e.target.value === "죽기" || e.target.value === "자살") {
                return <Redirect to="/blue" />
            } else {
                console.log(2)
                return <Redirect to="/happy" />
            }
        }
    }

    let happy = ""
    if (ishappy) {
        happy = "yes"
    } else {
        happy = "no"
    }
    const name = useInput("")
    return (
        <div>
            <div>{ happy }</div>
            <div>{ fortest }</div>
            <label htmlFor="name">원하는 것이 있나요?</label><br/>
            <input {...name} placeholder="원하는 것이 있나요?" onKeyPress={e => handleEnter(e)} />
        </div>
    )
}

export default Question;