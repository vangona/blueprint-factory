import React, { useEffect } from "react"
import "./Question.css"

function Question({props, page}) {

    function clearInputContainer() {
        const inputContainer = document.querySelector(".inputContainer")
        inputContainer.innerHTML = ""
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

    useEffect(() => {
        clearInputContainer()
        addAnswer()
    })

    return (
        <div className="main-container">
            <h4 className="questionTitle">
                {page === "thinking"
                ?"지금 어떤 생각을 하나요?"
                :page === "feeling"
                ?"지금 어떤 감정을 느끼고 있나요?"
                :page === "doing"
                ?"지금 해야하는데 하지 않고 있는 일이 있나요?"
                :page === "want"
                ?"바라고 있는 것이 있나요?"
                :null}
            </h4>
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
        </div> 
    )
}

export default Question;