import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';
import LongtermFactory from './LongtermFactory';
import ShorttermFactory from './ShorttermFactory';

const Container = styled.div`
    ${defaultContainer};
`;

const ChoiceBtn = styled.button``

const TermChoice = ({userObj, parent}) => {
    const [isLongterm, setIsLongterm] = useState(true);

    const onClick = (e) => {
        setIsLongterm(!isLongterm);
    }

    return (
        <Container>
            <ChoiceBtn onClick={onClick}>
                {isLongterm 
                ? "장기목표"
                : "단기목표"
                }
            </ChoiceBtn>
            {isLongterm 
            ?
                <LongtermFactory userObj={userObj} parent={parent} />
            :             
                <ShorttermFactory userObj={userObj} parent={parent} /> 
            }

        </Container>
    );
};

export default TermChoice;