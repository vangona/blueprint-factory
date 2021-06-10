import React, {useState} from "react"
import { useHistory } from "react-router";
import "./Thinking.css"

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

function Thinking({props}) {
    const history = useHistory();
    function handleEnter(e) {
        if (e.key === "Enter") {
            if (e.target.value === ""){
                history.push({
                    pathname: "/unhappy",
                    state: {
                        thinking: false
                    }
                })
            } else {
                localStorage.setItem('thinking_happy_algoritm', e.target.value)
                history.push({
                    pathname: "/unhappy",
                    state: {
                        want: false
                    }
                })
            }
        }
    }

    const name = useInput("")
    return (
        <div>
            <label htmlFor="name">무얼 생각하나요?</label><br/>
            <input {...name} placeholder="무얼 생각하나요?" onKeyPress={e => handleEnter(e)}/>
            <hr />
            <div>{ localStorage.getItem('doing_happy_algoritm')
                    ?<span>내가 해야할 일 : { localStorage.getItem('doing_happy_algoritm') }</span>
                    : null
                }</div>
        </div>
    )
}

export default Thinking;