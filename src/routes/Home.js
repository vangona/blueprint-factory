import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import Loading from "../components/Loading";
import { authService, dbService } from "../fBase";

const Contaier = styled.div`
    display: flex;
    flex-direction: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const TargetContainer = styled.div``;

const TargetContent = styled.div``;

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
                        {target.want}
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