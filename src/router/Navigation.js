import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { defaultContainer, outliner } from '../css/styleConstants';
import { AiOutlineHome } from "react-icons/ai"
import { FiUsers } from "react-icons/fi"
import { GiArcheryTarget } from "react-icons/gi"
import { FaRegCalendarAlt } from "react-icons/fa"
import { useState } from 'react/cjs/react.development';

const Container = styled.div`
    ${defaultContainer};
    position: fixed;
    bottom: 0;
    flex-direction: row;
    height: 65px;
    z-index: 5;
    justify-content: space-between;
    background-color: white;
`;

const NavBox = styled.div`
    display: flex;
    text-align: center;
    padding: 0 5%;
    font-size: 40px;
    z-index: 6;
    :hover {
        cursor: pointer;
    }
`;

const Navigation = () => {
    const navigate = useNavigate();
    const [curr, setCurr] = useState();

    const onClick = e => {
        const name = e.target.getAttribute('name');
        if (name === "home") {
            navigate('/');
            setCurr('home');
        }
        if (name === "blueprint") {
            navigate('/blueprint');
            setCurr('blueprint');
        }
        if (name === "community") {
            navigate('/community');
            setCurr('community');
        }
        if (name === "setting") {
            navigate('/setting');
            setCurr('setting');
        }
    }

    return (
        <Container>
            <NavBox name="home" onClick={onClick}>
                <AiOutlineHome name="home" className='navIcon' />
            </NavBox>
            <NavBox name="blueprint" onClick={onClick}>
                <GiArcheryTarget className='navIcon'  />
            </NavBox>
            <NavBox name="community" onClick={onClick}>
                <FiUsers className='navIcon'  />
            </NavBox>
            <NavBox name="setting"onClick={onClick}>
                <FaRegCalendarAlt className='navIcon' />
            </NavBox>
        </Container>
    );
};

export default Navigation;