import React from "react"
import { useHistory } from "react-router-dom"
import "./Home.css"

const Home = () => {
    const history = useHistory();

    function handleClick(e) {
        if (e.target.classList.contains('happy')) {
            localStorage.setItem('ishappy', true);
            history.push({
                pathname: '/happy',
                state: {
                    page: "when"
                }
            })
        } else {
            localStorage.setItem('ishappy', false);
            history.push({
                pathname: '/unhappy',
                state: {
                    page: "thinking"
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