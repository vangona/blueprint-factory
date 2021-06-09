import React, {useState} from "react"
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

function Feeling({ishappy}) {

    // function handleEnter(e) {
    //     if (e.key === 'Enter') {
    //         if (e.target.value === ""){
    //             return <Feeling 
    //                 ishappy= {ishappy}
    //             />
    //         } else if (e.target.value === "죽음" || e.target.value === "죽기" || e.target.value === "자살") {
    //             return Redirect("/blue")
    //         } else {
    //             return Redirect("/happy")
    //         }
    //     }
    // }

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
            <label htmlFor="name">무얼 느끼나요?</label><br/>
            <input {...name} placeholder="무얼 느끼나요?" />
        </div>
    )
}

export default Feeling;