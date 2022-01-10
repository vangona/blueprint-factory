import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer, outliner } from '../css/styleConstants';
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai"
import { FiUsers } from "react-icons/fi"
import { GiArcheryTarget } from "react-icons/gi"
import { FaRegCalendarAlt } from "react-icons/fa"

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

const ProfileBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    position: fixed;
    top: 20px;
    right: 15px;
    background-color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    ${defaultBtnAction};
`;

const ProfilePic = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

const Navigation = ({userObj}) => {
    const navigate = useNavigate();
    const [curr, setCurr] = useState();

    const onClickHome = e => {
        navigate('/');
    }

    const onClickBlueprint = e => {
        navigate('/blueprint');
    }

    const onClickCommunity = e => {
        navigate('/community');
    }

    const onClickCalendar = e => {
        navigate('/calendar')
    }

    const onClickSetting = e => {
        navigate('/setting')
    }

    return (
        <Container>
            <NavBox onClick={onClickHome}>
                <AiOutlineHome name="home" className='navIcon' />
            </NavBox>
            <NavBox onClick={onClickBlueprint}>
                <GiArcheryTarget className='navIcon'  />
            </NavBox>
            <NavBox onClick={onClickCommunity}>
                <FiUsers className='navIcon'  />
            </NavBox>
            <NavBox onClick={onClickCalendar}>
                <FaRegCalendarAlt className='navIcon' />
            </NavBox>
            <ProfileBox onClick={onClickSetting}>
                {userObj.photoURL 
                    ? <ProfilePic src={userObj.photoURL} />
                    : <AiOutlineUser />
                }
            </ProfileBox>
        </Container>
    );
};

export default Navigation;