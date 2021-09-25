import React from "react";
import styled, { keyframes } from "styled-components";
import { AiFillCloud } from "react-icons/ai"

const float = keyframes`
    0% { 
        transform: translateY(0) 
        }
    50% {
        transform: translateY(-20px)
    }
    100% {
        transform: translateY(0)
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Icon = styled.div`
    animation: ${float} 0.6s infinite;
    font-size: 100px;
    color: white;
    
`;

const Loading = () => {
    return (
        <Container>
            <Icon>
                <AiFillCloud />
            </Icon>
        </Container>
    )
}

export default Loading;