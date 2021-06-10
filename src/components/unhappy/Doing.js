import React, {useState} from "react"
import { useHistory } from "react-router";
import "./Doing.css"

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

function Doing({props}) {
    const history = useHistory();
    function handleEnter(e) {
        if (e.key === "Enter") {
            if (e.target.value === ""){
                history.push({
                    pathname: "/blue",
                    state: {
                        doing: false
                    }
                })
            } else {
                localStorage.setItem('doing_happy_algoritm', e.target.value)
                history.push({
                    pathname: "/unhappy",
                    state: {
                        feeling: false
                    }
                })
            }
        }
    }

    const name = useInput("")
    return (
        <div>
            <label htmlFor="name">해야하는 일이 있나요?</label><br/>
            <input {...name} placeholder="해야하는 일이 있나요?" onKeyPress={e => handleEnter(e)}/>
        </div>
    )
}

export default Doing;