import React from "react"
import { Link } from "react-router-dom";
import "./Home.css"

const Home = () => {
    return (
        <div className="home__container">
            <h1 className="home__title">행복 알고리즘</h1>
            <div className="happy-input__container">
            <label htmlFor="happy" className="happy-input__label">행복한가요?</label>
            <div className="happy-input__button__container">
                <Link to={{
                    pathname: "/happy",
                    state: {
                        ishappy: true,
                        fortest: "행복"
                    }
                }}>
                    <button className="happy-input__button">예</button>
                </Link>
                <Link to={{
                    pathname: "/unhappy",
                    state: {
                        ishappy: false,
                        fortest: "아직은 덜 행복"
                    }
                }}>
                    <button className="happy-input__button">아뇨</button>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Home;