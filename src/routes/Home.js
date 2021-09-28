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
    height: 100%;
    margin-top: 30px;
    color: white;
    font-family: serif;
    line-height: 120%;
`;

const TargetContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
`;

const Home = ({userObj}) => {
    const history = useHistory();
    const [targets, setTargets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getTargets = async () => {
        await dbService.collection(`${userObj.uid}`).where("type", "==", "target").get()
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
                    {targets.filter(target => target.state === "ongoing").map(target => 
                        <Target target={target} userObj={userObj} />
                    )
                    }
                </TargetContainer>
                <button onClick={()=>{
                    authService.signOut();
                    history.push("/")
                    }}>Log Out</button>
            </Contaier>
            : <Loading />
        }
        </>
    )
};

export default Home;