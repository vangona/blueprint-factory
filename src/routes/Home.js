import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { authService, dbService } from "../fBase";

const Contaier = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 30px;
`;

const TargetContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TargetContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    word-break: keep-all;
    margin: 15px;
`;

const TargetWant = styled.h3``;

const TargetNeed = styled.div``;

const TargetDate = styled.div``;

const Home = ({userObj}) => {
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

    const history = useHistory();
    useEffect(() => {
        getTargets();
    })
    return (
        <>
        {!isLoading
            ?
            <Contaier>
                <TargetContainer>
                    {targets.map(target => 
                    <TargetContent key={target.targetId}>
                        <TargetWant>
                            {target.want}
                        </TargetWant>
                        <TargetDate>
                            {target.date}까지
                        </TargetDate>
                        <TargetNeed>
                            {target.need} : {target.numericValue}
                        </TargetNeed>
                    </TargetContent>)
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