import React, {useState} from "react"
import { useHistory } from "react-router";
import "./Want.css"

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

function Want({props}) {
    const history = useHistory();
    function handleEnter(e) {
        if (e.key === "Enter") {
            if (e.target.value === ""){
                history.push({
                    pathname: "/unhappy",
                    state: {
                        want: false
                    }
                })
            } else if (e.target.value === "죽음" || e.target.value === "죽기" || e.target.value === "자살") {
                console.log("blue")
                history.push({
                    pathname: "/blue",
                    state: {
                        want: false
                    }
                })
            } else {
                localStorage.setItem('want_happy_algoritm', e.target.value)
                history.push({
                    pathname: "/happy",
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
            <div>{ props.location.state.fortest }</div>
            <label htmlFor="name">원하는 것이 있나요?</label><br/>
            <input {...name} placeholder="원하는 것이 있나요?" onKeyPress={e => handleEnter(e)} />
            <div>{ localStorage.getItem('feeling_happy_algoritm')
                    ?<div><span>내 머릿 속 생각 : { localStorage.getItem('thinking_happy_algoritm') }</span><br />
                    <span>해야할 일 : { localStorage.getItem('doing_happy_algoritm') }</span><br />
                    <span>느끼고 있는 것 : { localStorage.getItem('feeling_happy_algoritm') }</span><br />
                    </div>
                    : null 
            }</div>
        </div>
    )
}

export default Want;