import React from 'react';
import styled from 'styled-components';
import { defaultContainer, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
    ${targetFactoryContent};
    gap: 20px;
`;

const Title = styled.div`
    ${targetFactoryContentTitle};
    font-size: 25px;
`;

const Bold = styled.span`
    ${targetFactoryContentTitle};
    color: var(--main-blue);
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: SsurroundAir;
    gap: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    padding: 20px;
    word-break: keep-all;
`;

const Name = styled.div``;

const Deadline = styled.div``;

const NeedContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-family: SsurroundAir;
`;

const NeedBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

const Need = styled.div`
    word-break: keep-all;
`;

const Line = styled.hr`
    width: 90%;
`;

const PlanCheck = ({explainArr, target, needArr, deadline}) => {

    return (
        <Container>
            <Title>
                마지막으로 계획을 체크해봐요!
            </Title>
            <Content>
                <Name>
                    {target}
                </Name>
                <Deadline>
                    {deadline}까지
                </Deadline>
                <Line />
                <NeedContainer>
                    <Need>단계</Need>
                {explainArr.map((explain, index) => (
                    <NeedBox key={index}>
                        <Need>
                            {index + 1}단계 : {explain}
                        </Need>
                    </NeedBox>
                ))}
                </NeedContainer>
                <Line />
                <NeedContainer>
                    <Need>필요한 것</Need>
                {needArr.map((need, index) => (
                    <NeedBox key={index}>
                        <Need>{need}</Need>
                    </NeedBox>
                ))}
                </NeedContainer>
            </Content>
        </Container>
    );
};

export default PlanCheck;