import { css } from "styled-components";

export const defaultContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
`;

export const defaultTitle = css`
    font-size: 20px;
    font-weight: bold;
`;

export const outliner = css`
    border: 1px solid black;
`;

export const defaultShadow = css`
    -webkit-box-shadow: 8px 8px 20px -5px rgba(0,0,0,0.67); 
    box-shadow: 8px 8px 20px -5px rgba(0,0,0,0.67);
`;

export const spreadShadow = css`
    -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.3); 
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.3);
`;

export const defaultBtnAction = css`
    :hover {
        cursor: pointer;
    }
    :active {
        transform: scale(0.98);
    }
`;

export const targetFactoryContent = css`
    position: absolute;
    top: 0;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    z-index: 9;
`;

export const targetFactoryContentTitle = css`
    font-size: 28px;
    font-family: Ssurround;
    text-align: center;
    line-height: 55px;    
`;

export const targetFactoryContentInput = css`
    font-family: SsurroundAir;
    background-color: #EEEEEE;
    border-radius: 30px;
    width: 80%;
    height: 45px;
    padding: 20px;
    box-sizing: border-box;
`;

export const blockBtn = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
    background-color: white;
    border: none;
    width: 40px;
    height: 40px;
`;

export const sumbitBlockBtn = css`
    position: fixed;
    bottom: 20px;
    z-index: 99;
    background-color: white;
    border: none;
    width: 200px;
    height: 50px;
`;

export const navHeight = css`
    height: 50px;
`;