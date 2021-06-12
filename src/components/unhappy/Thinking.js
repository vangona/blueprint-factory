import React, { useEffect } from "react"
import { useHistory } from "react-router"
import "./Thinking.css"

function Thinking({props}) {
    const history = useHistory();

    function clearInputContainer() {
        const inputContainer = document.querySelector(".inputContainer")
        inputContainer.innerHTML = ""
    }

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
        answerContainer.innerHTML = ""
        clearBtn.style.display = "none";
    }

    function addAnswer(e, props) {
        const input = document.createElement("input")
        const inputContainer = document.querySelector(".inputContainer")
        
        input.classList.add("questionInput")
        inputContainer.appendChild(input)                
    }

    function reloadBtn(e) {
        clearInputContainer()
        addAnswer()
    }

    function handleAnswerClick(e) {
        if (e.target.parentNode.classList.contains("doing-list__container")){
            history.push({
                pathname: "/unhappy",
                state: {
                    page: "doing"
                }
            })
        } else if (e.target.parentNode.classList.contains("thinking-list__container")){
            history.push({
                pathname: "/unhappy",
                state: {
                    page: "thinking"
                }
            })
        } else if (e.target.parentNode.classList.contains("feeling-list__container")){
            history.push({
                pathname: "/unhappy",
                state: {
                    page: "feeling"
                }
            })
        } else if (e.target.parentNode.classList.contains("want-list__container")){
            history.push({
                pathname: "/unhappy",
                state: {
                    page: "want"
                }
            })
        }
    }

    function nextBtn(e) {
        const questionInputs = document.querySelectorAll(".questionInput")
        let questionArray = []
        for (let i = 0; i < questionInputs.length; i++) {
            if (questionInputs[i].value !== "") {
                questionArray.push(questionInputs[i].value)
            }
        }
        if (questionArray[0] !== undefined){
            localStorage.setItem('thinking_happy_algorithm', JSON.stringify(questionArray))
            history.push({
                pathname: "/unhappy",
                state: {
                    page: "want"
                }
            })
        } else {
            history.push({
                pathname: "/unhappy",
                state: {
                    page: "doing"
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

        clearInputContainer()
        const answerContainer = document.querySelector(".answer-container")
        answerContainer.innerHTML = ""

        if (things[0] !== null || things[1] !== null || things[2] !== null || things[3] !== null) {
            const clearBtn = document.querySelector(".clearBtn")
            clearBtn.style.display = "inline";
        }

        for (let i in things) {
            if ( things[i] !== null) {
                const div = document.createElement('div')
                const hr = document.createElement('hr')
                const h4 = document.createElement('h4')
                const ul = document.createElement('ul')
                let things_array = JSON.parse(things[i])

                h4.className = "list__title"
                ul.className = "list__answer"

                if (things[i] === doing_list) {
                    div.className = "doing-list__container"
                    h4.innerHTML = "할 일"
                } else if (things[i] === think_list) {
                    div.className = "thinking-list__container"
                    h4.innerHTML = "생각"
                } else if (things[i] === feel_list) {
                    div.className = "feeling-list__container"
                    h4.innerHTML = "마음"
                } else if (things[i] === want_list) {
                    div.className = "want-list__container"
                    h4.innerHTML = "원하는 것"
                }

                div.appendChild(h4)
                div.appendChild(hr)

                for (let j in things_array) {
                    const li = document.createElement('li')
                    li.innerHTML = `${things_array[j]}`
                    ul.appendChild(li)
                }

                div.classList.add('answer-list')
                div.appendChild(ul)
                answerContainer.appendChild(div)
            }

        }
        const answerTitles = document.querySelectorAll(".list__title")
        answerTitles.forEach(answertitle => {
            answertitle.addEventListener("click", handleAnswerClick)
        })
        const answerLists = document.querySelectorAll(".list__answer")
        answerLists.forEach(answerList => {
            answerList.addEventListener("click", handleAnswerClick)
        })

        addAnswer()
    })

    return (
        <div className="main-container">
            <h4 className="questionTitle">지금 어떤 생각을 하나요?</h4>
            <div className="questionBody">
                <span className="notice__span">적을 수 있는만큼 다 적어보세요.</span>
                <div className="inputContainer">
                </div>
                <hr style={{width: "100%"}}/>
                <div>
                    <button className="addAnswerBtn btn" onClick={(e) => addAnswer(e, props)}>빈칸 추가하기</button>
                    <button className="addAnswerBtn btn" onClick={(e) => reloadBtn(e)}>전체 지우기</button>
                </div>
            </div>    
            <div className="answer-container">
            </div>
            <div className="btn__container"> 
                <button className="clearBtn btn" onClick={(e) => reZero(e, {props})}>다 지우기</button> 
                <button className="backBtn btn" onClick={(e) => backBtn(e, {props})}>뒤로 돌아가기</button>
                <button className="addAnswerBtn btn" onClick={(e) => nextBtn(e)}>저장 & 다음으로</button>  
            </div>
        </div>
    )
}

export default Thinking;