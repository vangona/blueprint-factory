import React, { useEffect } from 'react';
import styled from 'styled-components';
import { defaultContainer, defaultShadow } from '../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
`;

const SelectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Selection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border: 1px solid black;
    border-radius: 15px;
    padding: 20px 30px;
    min-width: 60%;
    max-width: 80%;
    box-sizing: border-box;
    ${defaultShadow};
`;

const Name = styled.h1`
    color: var(--main-blue);
    font-family: Ssurround;
    font-size: 20px;
`;

const Explain = styled.div`
    font-family: SsurroundAir;
`;

const EventComponent = ({selected}) => {
    useEffect(() => {
        console.log(selected);
    }, [selected])

    return (
        <Container>
            <SelectionContainer>
            {selected && selected.map((el, index) => (
                <Selection key={index}>
                    <Name>{el.name}</Name>
                    <Explain>{el.explain}</Explain>
                </Selection>
            ))}
            </SelectionContainer>
        </Container>
    );
};

export default EventComponent;