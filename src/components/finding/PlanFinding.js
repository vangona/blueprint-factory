import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../../fBase";
import { Cheers } from "../CheerDB";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    font-family: Kyobo Handwriting;
`;

const Question = styled.span`
    font-size: 1rem;
    margin-bottom: 20px;
    line-height: 140%;
`;

const BtnContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const AnswerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const AnswerBox = styled.div`
`;

const AnswerLabel = styled.label`
`;

const AnswerInput = styled.input``;

const AnswerNextBtn = styled.button``;

const AnswerPrevBtn = styled.button``;

const Cheer = styled.div`
    text-align: center;
    line-height: 25px;
`;

const CheerMent = styled.span``;

const ShorttermContainer = styled.div``;

const ShorttermTitle = styled.div`
    border: 1px solid black;
    color: black;
    padding: 10px 15px;
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const TargetContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const TargetContent = styled.div``;

const HomeBtn = styled.button`
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const PlanFinding = ({userObj, targets, goHome}) => {
    const [selection, setSelection] = useState('');
    const [level, setLevel] = useState('');
    const [levelArr, setLevelArr] = useState([]);
    const [levelContentArr, setLevelContentArr] = useState([]);
    const [pointArr, setPointArr] = useState([]);
    const [dateArr, setDateArr] = useState([]);
    const [isNow, setIsNow] = useState(false);
    const [step, setStep] = useState('');
    const [shortterms, setShortterms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChange = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "level") {
            setLevel(e.target.value);
            const arr = [];
            for (let i = 1; i <= e.target.value; i++) {
                arr[i - 1] = [i];
            }
            setLevelArr(arr);
        } else if (name === "point") {
        } else if (name === "isNow") {
            setIsNow(true);
        }
    };

    const onClickPrev = e => {
        e.preventDefault();
        setStep(step-1);
    };

    const onClick = e => {
        if (e.target.getAttribute("name") === "plan") {
            setStep(1);
        } else if (e.target.getAttribute("name") === "levelContent") {
            const levelarr = levelArr;
            const arr = [];
            const contents = document.querySelectorAll("input[name='levelContent']")
            contents.forEach((content, index) => {
                levelarr[index].push(content.value);
                arr[index] = content.value;
            })
            setLevelArr(levelarr);
            setLevelContentArr(arr);
            setStep(step + 1);
        } else if (e.target.getAttribute("name") === "point") {
            const levelarr = levelArr;
            const arr = [];
            const contents = document.querySelectorAll("input[name='point']")
            contents.forEach((content, index) => {
                levelarr[index].push(content.value);
                arr[index] = content.value;
            })
            setLevelArr(levelarr);
            setPointArr(arr);
            setStep(step + 1);
        } else if (e.target.getAttribute("name") === "date") {
            const levelarr = levelArr;
            const arr = [];
            const contents = document.querySelectorAll("input[name='date']")
            contents.forEach((content, index) => {
                levelarr[index].push(content.value);
                arr[index] = content.value;
            })
            console.log(levelarr);
            setLevelArr(levelarr);
            setDateArr(arr);
            setStep(step + 1);            
        } else {
            setStep(step + 1);
        }
    };

    const onClickSelection = e => {
        setSelection(JSON.parse(e.target.getAttribute("value")))
    };

    const onSubmit = async () => {
        const targetId = uuidv4();
        const targetObj = {
            targetId,
            want: selection.want,
            parentId: selection.targetId,
            level,
            levelContentArr,
            pointArr,
            dateArr,
            isNow,
            type: "plan",
            queryType: "target",
            state: "ongoing",
            registeredTime: Date.now(),
            cancelReason : '',
            completeFeeling: '',
        }
        await dbService.collection(`${userObj.uid}`).doc(targetId).set(targetObj)
        alert("성공적으로 설정되었습니다!")
        setLevel('')
        setLevelArr([]);
        setLevelContentArr([]);
        setPointArr([])
        setDateArr([]);
        setIsNow(false);
    }

    const getShortterm = () => {
        setShortterms(targets.filter(target => target.state === "ongoing" && target.type === "shortterm"))
        setIsLoading(false);
    }

    useEffect(() => {
        getShortterm();
    }, []);

    return (
        <Container>
            {!isLoading &&
            <>
            {!selection &&
            <>  
                <Question>계획의 목표는 무엇인가요?</Question>
                <ShorttermContainer>
                    {shortterms.map(target => 
                        <ShorttermTitle onClick={onClickSelection} value={JSON.stringify(target)}>{target.want}
                    </ShorttermTitle>
                    )}
                </ShorttermContainer>
            </>
            }
            {selection && !step && (
                <>
                    <Question>{selection.want}에 대해 기간을 나눠 계획을 세워봅시다.</Question>
                    <Question>필요한 것 : {selection.want}</Question>
                    <Question>기한 : {selection.date}까지</Question>
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClick} name="plan">다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 1 && (
                <>
                    <Question>{selection.want}를 단계로 나눈다면 몇 단계로 나눌 수 있을까요?</Question>                    
                    <AnswerInput onChange={onChange} name="level" value={level} type="number" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="level" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 2 && (
                <>
                    <Question>
                        각 단계를 적어봅시다.
                    </Question>
                    <AnswerContainer>
                        {levelArr.map(el => (
                            <AnswerBox>
                                <AnswerLabel>{el}단계 : </AnswerLabel>
                                <AnswerInput onChange={onChange} class="levelContent" name="levelContent" id="el" type="text" />
                            </AnswerBox>                       
                        ))}
                    </AnswerContainer>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="levelContent" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 3 && (
                <>
                    <Question>
                        각 단계의 목표치를 적어봅시다.
                    </Question>
                    <AnswerContainer>
                        {levelArr.map(el => (
                            <AnswerBox>
                                <AnswerLabel>{el[1]} : </AnswerLabel>
                                <AnswerInput class="point" name="point" id="el" type="text" />
                            </AnswerBox>                       
                        ))}
                    </AnswerContainer>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="point" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 4 && (
                <>
                    <Question>도달별 마감일을 정해보세요</Question>
                    <AnswerContainer>
                        {levelArr.map(el => (
                            <AnswerBox>
                                <AnswerLabel>{el[2]} : </AnswerLabel>
                                <AnswerInput class="date" name="date" id="el" type="date" />
                            </AnswerBox>                       
                        ))}
                    </AnswerContainer>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="date" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 5 && (
                <>
                    <Question>당장 이 계획을 실행해도 문제가 없나요?</Question>
                    <BtnContainer>
                        <AnswerNextBtn name="isNow" onClick={onClick}>예
                        </AnswerNextBtn>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            아니오
                        </AnswerPrevBtn>
                    </BtnContainer>
                </>
            )}         
            {step === 6 && (
                <TargetContainer>
                    <TargetContent>
                        목표 : {selection.want}
                    </TargetContent>
                    <TargetContent>
                        필요한 것 : {selection.need}
                    </TargetContent>
                    <TargetContent>
                        {level && `${level}단계 계획`}
                    </TargetContent>
                    {levelArr && levelArr.map(levelContent => 
                    <TargetContent>
                        {levelContent[1]} {levelContent[2] && `: ${levelContent[2]}`} {levelContent[2] && `${levelContent[3]}까지`}
                    </TargetContent>
                    )}
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            수정하기
                        </AnswerPrevBtn>
                        <AnswerNextBtn onClick={() => {
                            if (window.confirm("목표가 마음에 드시나요?")) { onSubmit() }
                        }}>
                            목표 설정하기
                        </AnswerNextBtn>
                    </BtnContainer>
                </TargetContainer>
            )}
            {!(step === 6) && 
            <TargetContainer>
                <TargetContent>
                    {level && `${level}단계 계획`}
                </TargetContent>
                {levelArr && levelArr.map(levelContent => 
                    <TargetContent>
                        {levelContent[0] && `${levelContent[0]}단계 `} 
                        {levelContent[1] && ` ${levelContent[1]}`} 
                        {levelContent[2] && `, ${levelContent[2]}`} 
                        {levelContent[3] && ` : ${levelContent[3]}까지`}
                    </TargetContent>
                )}
            </TargetContainer>
            }
            </>
            }
            <HomeBtn onClick={goHome}>
                홈으로
            </HomeBtn>
        </Container>
    )
}

export default PlanFinding;