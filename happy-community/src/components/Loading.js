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
    flex-direction: column;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Icon = styled.div`
    animation: ${float} 1s infinite;
    font-size: 100px;
    color: white;
    
`;

const Phrases = styled.span`
    color: white;
    font-size: 14px;
    font-family: Kyobo Handwriting;
`;

const Loading = () => {
    return (
        <Container>
            <Icon>
                <AiFillCloud />
            </Icon>
            <Phrases>뜬구름으로 솜사탕 만드는 중...</Phrases>
        </Container>
    )
}

export default Loading;