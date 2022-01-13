import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';
import SearchBar from './SearchBar';
import {ImCloud} from "react-icons/im"

const Container = styled.div`
    ${defaultContainer};
    justify-content: flex-start;
    height: 20vh;
    background: rgb(86,124,233);
    background: linear-gradient(180deg, rgba(86,124,233,1) 0%, rgba(172,190,255,1) 100%);
`;

const Cloud = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 45px;
    transform: scaleX(-1);
`;

const UpperComponent = () => {
    return (
        <Container>
            <Cloud>
                <ImCloud style={{fill: "white", color: "white"}} />
            </Cloud>
            <SearchBar />
        </Container>
    );
};

export default UpperComponent;