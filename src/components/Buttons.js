import React, { useEffect } from "react"
import { useHistory } from "react-router"

function Buttons({props}) {
    const history = useHistory();

    function backBtn(e, {props}) {
        props.history.goBack()
    }

    function reZero(e, {props}) {
        localStorage.removeItem('doing_happy_algorithm')
        localStorage.removeItem('thinking_happy_algorithm')
        localStorage.removeItem('feeling_happy_algorithm')
        localStorage.removeItem('want_happy_algorithm')
        const answerContainer = document.querySelector(".answer-container")
        const clearBtn = document.querySelector(".clearBtn")
        answerContainer.style.display = "none";
        clearBtn.style.display = "none";
    }

    function nextBtn(e, {props}) {
        const page = props.history.location.state.page
        console.log(props)
        const questionInputs = document.querySelectorAll(".questionInput")
        const pageObj = {
            "thinkingAnswer": "want",
            "thinkingNo": "doing",
            "feelingAnswer": "want",
            "feelingNo": "doing",
            "doingAnswer": "want",
            "doingNo": "thinking",
            "wantAnswer": "when",
            "wantNo": "feeling"
        }
        let questionArray = []
        let localStorageItem = `${page}_happy_algorithm`
        
        for (let i = 0; i < questionInputs.length; i++) {
            if (questionInputs[i].value !== "") {
                questionArray.push(questionInputs[i].value)
            }
        }

        if (questionArray[0] !== undefined){
            localStorage.setItem(localStorageItem, JSON.stringify(questionArray))
            history.push({
                pathname: "/unhappy",
                state: {
                    page: pageObj[`${page}Answer`]
                }
            })
        } else {
            history.push({
                pathname: "/unhappy",
                state: {
                    page: pageObj[`${page}No`]
                }
            })
        } 
    }

    useEffect(() => {
        const doing_list = localStorage.getItem('doing_happy_algorithm')
        const think_list = localStorage.getItem('thinking_happy_algorithm')
        const feel_list = localStorage.getItem('feeling_happy_algorithm')
        const want_list = localStorage.getItem('want_happy_algorithm')

        const things = [doing_list, think_list, feel_list, want_list]

        if (things[0] !== null || things[1] !== null || things[2] !== null || things[3] !== null) {
            const clearBtn = document.querySelector(".clearBtn");
            clearBtn.style.display = "inline";
        }  
    })

    return (
        <div className="btn__container"> 
            <button className="clearBtn btn" onClick={(e) => reZero(e, {props})}>다 지우기</button> 
            <button className="backBtn btn" onClick={(e) => backBtn(e, {props})}>뒤로 돌아가기</button>
            <button className="addAnswerBtn btn" onClick={(e) => nextBtn(e, {props})}>저장 & 다음으로</button>  
        </div>
    )
}

export default Buttons