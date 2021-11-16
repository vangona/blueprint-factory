import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const SelectionTitle = styled.div`
    border: 1px solid black;
    color: black;
    padding: 10px 15px;
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const Selector = ({targets, getSelection}) => {
    const onClickSelection = e => {
        getSelection(JSON.parse(e.target.getAttribute("value")))
    };

    return (
        <Container>
            {targets.map(target => 
                    <SelectionTitle onClick={onClickSelection} value={JSON.stringify(target)}>{target.want}</SelectionTitle>
                )}
        </Container>
    )
}

export default Selector;