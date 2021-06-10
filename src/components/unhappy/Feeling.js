import React, {useState} from "react"
import { useHistory } from "react-router";
import "./Feeling.css"

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

function Feeling({props}) {
    const history = useHistory();
    function handleEnter(e) {
        if (e.key === "Enter") {
            if (e.target.value === ""){
                history.push({
                    pathname: "/unhappy",
                    state: {
                        feeling: false
                    }
                })
            } else {
                localStorage.setItem('feeling_happy_algoritm', e.target.value)
                history.push({
                    pathname: "/unhappy",
                    state: {
                        want: true
                    }
                })
            }
        }
    }

    const name = useInput("")
    return (
        <div>
            <label htmlFor="name">무얼 느끼나요?</label><br/>
            <input {...name} placeholder="무얼 느끼나요?" onKeyPress={e => handleEnter(e)}/>
            <div>{ localStorage.getItem('thinking_happy_algoritm')
                    ?<div><span>내 머릿 속 생각 : { localStorage.getItem('thinking_happy_algoritm') }</span><br />
                    <span>해야할 일 : { localStorage.getItem('doing_happy_algoritm') }</span></div>
                    : null 
            }</div>
        </div>
    )
}

export default Feeling;