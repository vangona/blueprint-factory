import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import Target from "../components/Target";
import { authService, dbService } from "../fBase";

const Contaier = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
    margin-top: 30px;
    color: white;
    font-family: Kyobo Handwriting;
    font-size: 18px;
    line-height: 120%;
`;

const TargetContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
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

const Home = ({userObj}) => {
    const history = useHistory();
    const [targets, setTargets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getTargets = async () => {
        await dbService.collection(`${userObj.uid}`).where("type", "==", "shortterm").get()
        .then(querySnapshot => {
            const targetData = querySnapshot.docs.map(snapshot => ({
                ...snapshot.data()
            }))
            setTargets(targetData)
            setIsLoading(false);
        })
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
                        {targets.filter(target => target.state === "ongoing").map(target => 
                            <Target key={target.targetId} target={target} userObj={userObj} />
                        )
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