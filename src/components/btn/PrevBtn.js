import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BackBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 50;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;
    font-size: 30px;
    transform: scaleY(-1);
    :hover {
        cursor: pointer;
    }
    :active {
        transform: scaleY(-1) scale(0.98);
    }
`;

const PrevBtn = () => {
    const navigate = useNavigate();

    const onClick = e => {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <BackBtn onClick={onClick}>
            <BiArrowBack />
        </BackBtn>
    );
};

export default PrevBtn;