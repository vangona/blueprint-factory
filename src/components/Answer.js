import React, { useEffect } from "react"
import { useHistory } from "react-router"

function Answer() {
    const history = useHistory();
    
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

    useEffect(() => {
        const doing_list = localStorage.getItem('doing_happy_algorithm')
        const think_list = localStorage.getItem('thinking_happy_algorithm')
        const feel_list = localStorage.getItem('feeling_happy_algorithm')
        const want_list = localStorage.getItem('want_happy_algorithm')

        const things = [doing_list, think_list, feel_list, want_list]
        const answerContainer = document.querySelector(".answer-container")
        if (answerContainer !== null){
            answerContainer.innerHTML = ""

            for (let i in things) {
                if ( things[i] !== null) {
                    const div = document.createElement('div')
                    const container = document.createElement('div')
                    const hr = document.createElement('hr')
                    const h4 = document.createElement('h4')
                    const ul = document.createElement('ul')
                    let things_array = JSON.parse(things[i])

                    container.className = "answer-container"
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
        }     
    })

    return (
        <div className="answer-container">
        </div>
    )
}

export default Answer;