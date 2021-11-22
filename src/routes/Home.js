import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import Plan from "../components/Plan";
import Target from "../components/Target";
import { authService, dbService } from "../fBase";

const Contaier = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin-top: 100px;
    color: black;
    font-family: Kyobo Handwriting;
    font-size: 18px;
    line-height: 120%;
`;

const TargetContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-height: 100%;
    overflow: auto;
`;

const TargetSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    margin-top: 20px;
`;

const TargetTitle = styled.div`
    font-size: 20px;
    margin-bottom: 5px;
`;

const Contour = styled.hr`
    width: 80%;
`;

const Notice = styled.span`
    text-align: center;
    line-height: 160%;
`;

const FindBtn = styled.button`
    margin-top: 10px;
    color: white;
    padding: 3px 10px;
    border-radius: 10px;
    border: 0.5px white solid;
    background-color: rgba(255,255,255,0.1);
`;

const Home = ({userObj, targets}) => {
    const history = useHistory();
    const [longterms, setLongterms] = useState([]);
    const [shortterms, setShortterms] = useState([]);
    const [plans, setPlans] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getTargets = async () => {
            setLongterms(targets.filter(target => target.state === "ongoing" && target.type === "longterm"))
            setShortterms(targets.filter(target => target.state === "ongoing" && target.type === "shortterm"))
            setPlans(targets.filter(target => target.state === "ongoing" && target.type === "plan"))
            setRoutines(targets.filter(target => target.state === "ongoing" && target.type === "routine"))
            setIsLoading(false);
    }

    useEffect(() => {
        getTargets();
    })
    return (
        <>
        {!isLoading
            ?
            <Contaier>
                <TargetContainer>
                    {targets.filter(target => target.state === "ongoing").length !== 0 
                    ?
                    <>
                        {longterms.length !== 0 && 
                        <TargetSubContainer>
                            <TargetTitle>장기 목표</TargetTitle>
                            {longterms.map(target => 
                            <Target key={target.targetId} target={target} userObj={userObj} />
                            )}
                            <Contour />
                        </TargetSubContainer>
                        }
                        {shortterms.length !== 0 && 
                        <TargetSubContainer>
                            <TargetTitle>단기 목표</TargetTitle>
                            {shortterms.map(target => 
                            <Target key={target.targetId} target={target} userObj={userObj} />
                            )}
                            <Contour />                            
                        </TargetSubContainer>
                        }
                        {plans.length !== 0 && 
                        <TargetSubContainer>
                            <TargetTitle>계획</TargetTitle>
                            {plans.map(target => 
                            <Plan key={target.targetId} target={target} userObj={userObj} />
                            )}
                            <Contour />
                        </TargetSubContainer>
                        }
                        {routines.length !== 0 && 
                        <TargetSubContainer>
                            <TargetTitle>루틴</TargetTitle>
                            {routines.map(target => 
                            <Target key={target.targetId} target={target} userObj={userObj} />
                            )}
                            <Contour />
                        </TargetSubContainer>
                        }                                               
                    </>
                    : 
                    <Notice>
                        현재 진행중인 목표가 없어요. <br /> 목표를 찾아보세요. <br/>
                        <FindBtn onClick={() => {
                            history.push("/goal")
                        }}>목표 찾기</FindBtn>
                    </Notice>
                    }
                </TargetContainer>
            </Contaier>
            : <Loading />
        }
        </>
    )
};

export default Home;