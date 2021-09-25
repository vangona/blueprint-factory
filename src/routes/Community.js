import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Friends = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 15px;
    background-color: rgba(255,255,255,0.7);
    width: 200px;
    height: 500px;
    margin-right: 20px;
    font-size: 15px;
`;

const Friend = styled.span`
    font-style: oblique;
    font-size: 14px;
    line-height: 20px;
    margin-top: 20px;
`;

const TargetNow = styled.span`
    font-weight: bold;
    margin-bottom: 10px;
    line-height: 20px;
    font-size: 13px;
`;

const PlanNow = styled.span`
    font-weight: bold;
    font-size: 12px;
    margin-left: 7px;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    line-height: 25px;
`;

const SubPlan = styled.span`
    font-weight: 400;
    margin-left: 7px;
`;

const PushBtn = styled.button`
    margin-left: 32px;
`;

const CheerContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Cheer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255,0.7);
    border-radius: 10px;
    width: 300px;
    height: 200px;
    -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.32); 
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.32);
    
    margin-bottom: 20px;
`;

const CheerPhrase = styled.span`
    font-size: 14px;
    width: 80%;
    text-align: center;
    margin-bottom: 25px;
    line-height: 20px;
`;

const ThankYou = styled.button`
    width: 100px;
    border-radius: 10px;
    background-color: rgba(255,255,255, 0.8);
`;

const Community = () => {
    return (
        <Container>
            <Friends>
                '김관경'님의 친구 목록
                <Friend>
                    신민아
                    <PushBtn>응원하기🎉</PushBtn>
                </Friend>
                <hr style={{width: "100%"}} />
                <TargetNow>
                    지혜로운 사람 되기
                </TargetNow>
                <PlanNow>
                    · 똑똑해지기
                    <SubPlan>
                        - 1달에 책 한 권 읽기
                    </SubPlan>
                    <SubPlan>
                        - 대학원 진학
                    </SubPlan>
                </PlanNow>
                <PlanNow>
                    · 넓은 시야 가지기
                    <SubPlan>
                        - 1달 2회 이상 전시회 가기
                    </SubPlan>
                    <SubPlan>
                        - 다양한 사람 만나기
                    </SubPlan>
                </PlanNow>
                <hr style={{width: "100%", marginBottom: "20px"}} />
                '김관경'님의 팀
                <Friend>
                    같이 '부자되기' 팀
                </Friend>
            </Friends>
            <CheerContainer>
            <Cheer>
                <CheerPhrase>
                🎉신민아 님이 '부자되기' 목표에 <br />응원을 보냈습니다.🎉
                </CheerPhrase>
                <ThankYou>고마워요✨</ThankYou>
            </Cheer>
            <Cheer>
                <CheerPhrase>
                김관경 님이 목표에 <br />
                함께하고 싶어합니다.
                </CheerPhrase>
                <ThankYou>함께하기</ThankYou>
            </Cheer>
            </CheerContainer>
        </Container>
    )
}

export default Community;