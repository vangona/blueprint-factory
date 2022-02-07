import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { defaultContainer, defaultShadow } from '../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
`;

const SelectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-height: 45vh;
    overflow: scroll;
    padding: 20px 0;
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

const SelectionDetailContainer = styled.div``;

const Name = styled.h1`
    color: var(--main-blue);
    font-family: Ssurround;
    font-size: 20px;
`;

const Explain = styled.div`
    font-family: SsurroundAir;
`;

const EventComponent = ({selected}) => {
    const [seletedData, setSelectedData] = useState('');

    return (
        <Container>
            <SelectionContainer>
            {selected && selected.map((el, index) => (
                <Selection key={index} onClick={(e) => setSelectedData(el)}>
                    <Name>{el.name}</Name>
                    <Explain>{Array.isArray(el.explain) ? '계획 완료날' : el.explain}</Explain>
                </Selection>
            ))}
            </SelectionContainer>
            <SelectionDetailContainer>
                {seletedData.name}
            </SelectionDetailContainer>
        </Container>
    );
};

export default EventComponent;