import React, { useState } from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';
import { BiSearchAlt2 } from "react-icons/bi"

const Container = styled.div`
    ${defaultContainer};
    height: 100px;
    justify-content: flex-start;
`;

const SearchBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    height: 35px;
    width: 70%;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(0,0,0, 0.2);
    font-size: 14px;
    border-radius: 20px;
    gap: 10px;
    transition: all 0.5s ease-in-out;
    :focus-within {
        border-radius: 25px;
    }
`;

const SearchInput = styled.input`
    height: 30px;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 14px;
    font-family: SsurroundAir;
    ::-webkit-input-placeholder {
        color: white;
        font-size: 14px;
        vertical-align: bottom;
        font-family: SsurroundAir;
    }
`;

const SearchBar = ({ getSearchWord, searchWord }) => {

    const onChange = (e) => {
        e.preventDefault();
        getSearchWord(e.target.value);
    }

    return (
        <Container>
            <SearchBox>
                <BiSearchAlt2 />
                <SearchInput onChange={onChange} value={searchWord} placeholder='Search' />
            </SearchBox>
        </Container>
    );
};

export default SearchBar;