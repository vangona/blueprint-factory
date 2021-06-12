import React, {useState} from "react"
import { useHistory } from "react-router";
import "./When.css"

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

function When({props}) {
    const history = useHistory();
    function handleEnter(e) {
        localStorage.setItem('when_happy_algoritm', e.target.value)
        history.push({
            pathname: "/happy",
            state: {
                what: true
            }
        })
    }

    function backBtn(e, {props}) {
        props.history.goBack()
    }
    
    const name = useInput("")
    return (
        <div>
            <label htmlFor="name">언제 행복한가요?</label><br/>
            <input {...name} placeholder="언제 행복한가요?" onKeyPress={e => handleEnter(e)}/>
            <hr />
            <div>{ localStorage.getItem('want_happy_algoritm')
                    ?<div>
                        <span>내 머릿 속 생각 : { localStorage.getItem('thinking_happy_algoritm') }</span><br />
                        <span>해야할 일 : { localStorage.getItem('doing_happy_algoritm') }</span><br />
                        <span>느끼고 있는 것 : { localStorage.getItem('feeling_happy_algoritm') }</span><br />
                        <span>내가 원하고 있는 것 : { localStorage.getItem('want_happy_algoritm') }</span>
                    </div>
                    : null
                }</div>
            <button onClick={(e) => backBtn(e, {props})}>뒤로 돌아가기</button>
        </div>
    )
}

export default When;