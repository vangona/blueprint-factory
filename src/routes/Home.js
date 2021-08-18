import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../fBase";

const Contaier = styled.div`
    position: absolute;
`;

const Home = () => {
    const history = useHistory();
    return (
        <Contaier>
            <button onClick={()=>{
                authService.signOut();
                history.push("/")
                }}>Log Out</button>
        </Contaier>
    )
};

export default Home;