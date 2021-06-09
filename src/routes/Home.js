import React from "react"
import "./Home.css"

const Home = (props) => {
    function handleClick(e) {
        if (e.target.classList.contains('happy')) {
            localStorage.setItem('ishappy', true);
            props.history.push({
                pathname: '/happy',
                state: {
                    fortest: "행복"
                }
            })
        } else {
            localStorage.setItem('ishappy', false);
            props.history.push({
                pathname: '/unhappy',
                state: {
                    fortest: "노력"
                }
            })
        }
    }
    return (
        <div className="home__container">
            <h1 className="home__title">행복 알고리즘</h1>
            <div className="happy-input__container">
            <label htmlFor="happy" className="happy-input__label">행복한가요?</label>
            <div className="happy-input__button__container">
                <button className="happy-input__button happy" onClick={e => handleClick(e)}>예</button>
                <button className="happy-input__button" onClick={e => handleClick(e)}>아뇨</button>
            </div>
            </div>
        </div>
    )
}

export default Home;