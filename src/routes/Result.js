import React from "react"
import { Link } from "react-router-dom"

const Result = () => {
    return (
        <div>
            <Link to={{
                pathname: "/unhappy",
                state: {
                    thinking: false
                }
            }}>
                <span>해야할 일 : { localStorage.getItem('doing_happy_algoritm') }</span><br />
            </Link>
            <Link to={{
                pathname: "/unhappy",
                state: {
                    feeling: false
                }
            }}>
                <span>내 머릿 속 생각 : { localStorage.getItem('thinking_happy_algoritm') }</span><br />
            </Link>
            <Link to ={{
                pathname: "unhappy",
                state: {
                    want: false
                }
            }}>
                <span>느끼고 있는 것 : { localStorage.getItem('feeling_happy_algoritm') }</span><br />
            </Link>
            <Link to ={{
                pathname: "unhappy",
                state: {
                    want: true
                }
            }}>
                <span>내가 원하고 있는 것 : { localStorage.getItem('want_happy_algoritm') }</span><br />
            </Link>
            <Link to ={{
                pathname: "/happy",
                state: {
                    what: false
                }
            }}>
                <span>내가 행복을 느끼는 지점 : {localStorage.getItem('what_happy_algoritm') }</span><br /> 
            </Link>
            <Link to ={{
                pathname: "/happy",
                state: {
                    what: true
                }
            }}>
                <span>행복을 위한 계획 : {localStorage.getItem('plan_happy_algoritm') }</span><br /> 
            </Link>
            <Link to="/">    
                <button>처음으로 돌아가기</button> 
            </Link>     
        </div>
    )
}

export default Result;