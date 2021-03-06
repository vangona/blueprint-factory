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

const PlanFinding = ({userObj, targets, goHome, parent}) => {
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
                levelarr[index][1] = content.value;
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
                levelarr[index][2] = content.value;
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
                levelarr[index][3] = content.value;
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
            want: selection.display,
            display: `${selection.display}??? ?????? ??????`,
            parentId: selection.targetId,
            level,
            displayContent : levelContentArr,
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
        alert("??????????????? ?????????????????????!")
        setLevel('')
        setLevelArr([]);
        setLevelContentArr([]);
        setPointArr([])
        setDateArr([]);
        setIsNow(false);
        setSelection('');
        setStep('');
    }

    const getShortterm = () => {
        setShortterms(targets.filter(target => target.state === "ongoing" && target.type === "shortterm"))
        setIsLoading(false);
    }

    useEffect(() => {
        if (parent) {
            setSelection(parent);
        }
        getShortterm();
    }, [parent]);

    return (
        <Container>
            {!isLoading &&
            <>
            {!selection &&
            <>  
                <Question>????????? ????????? ????????????????</Question>
                <ShorttermContainer>
                    {shortterms.map(target => 
                        <ShorttermTitle onClick={onClickSelection} value={JSON.stringify(target)}>{target.display}
                    </ShorttermTitle>
                    )}
                </ShorttermContainer>
            </>
            }
            {selection && !step && (
                <>
                    <Question>{selection.display}??? ?????? ????????? ?????? ????????? ???????????????.</Question>
                    <Question>????????? ??? : {selection.display}</Question>
                    <Question>?????? : {selection.date}??????</Question>
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClick} name="plan">????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 1 && (
                <>
                    <Question>{selection.display}??? ????????? ???????????? ??? ????????? ?????? ??? ?????????????</Question>                    
                    <AnswerInput onChange={onChange} name="level" value={level} type="number" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn name="level" onClick={onClick}>????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 2 && (
                <>
                    <Question>
                        ??? ????????? ???????????????.
                    </Question>
                    <AnswerContainer>
                        {levelArr.map(el => (
                            <AnswerBox>
                                <AnswerLabel>{el[0]}?????? : </AnswerLabel>
                                <AnswerInput onChange={onChange} value={el[1] ? el[1] : null} class="levelContent" name="levelContent" id="el" type="text" />
                            </AnswerBox>                       
                        ))}
                    </AnswerContainer>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn name="levelContent" onClick={onClick}>????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 3 && (
                <>
                    <Question>
                        ??? ????????? ???????????? ???????????????.
                    </Question>
                    <AnswerContainer>
                        {levelArr.map(el => (
                            <AnswerBox>
                                <AnswerLabel>{el[1]} : </AnswerLabel>
                                <AnswerInput class="point" name="point" value={el[2] ? el[2] : null} id="el" type="text" />
                            </AnswerBox>                       
                        ))}
                    </AnswerContainer>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn name="point" onClick={onClick}>????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 4 && (
                <>
                    <Question>????????? ???????????? ???????????????</Question>
                    <AnswerContainer>
                        {levelArr.map(el => (
                            <AnswerBox>
                                <AnswerLabel>{el[2]} : </AnswerLabel>
                                <AnswerInput class="date" name="date" value={el[3] ? el[3] : null} id="el" type="date" />
                            </AnswerBox>                       
                        ))}
                    </AnswerContainer>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn name="date" onClick={onClick}>????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 5 && (
                <>
                    <Question>?????? ??? ????????? ???????????? ????????? ??????????</Question>
                    <BtnContainer>
                        <AnswerNextBtn name="isNow" onClick={onClick}>???
                        </AnswerNextBtn>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            ?????????
                        </AnswerPrevBtn>
                    </BtnContainer>
                </>
            )}         
            {step === 6 && (
                <TargetContainer>
                    <TargetContent>
                        ?????? : {selection.display}
                    </TargetContent>
                    <TargetContent>
                        ????????? ??? : {selection.need}
                    </TargetContent>
                    <TargetContent>
                        {level && `${level}?????? ??????`}
                    </TargetContent>
                    {levelArr && levelArr.map(levelContent => 
                    <TargetContent>
                        {levelContent[1]} {levelContent[2] && `: ${levelContent[2]}`} {levelContent[2] && `${levelContent[3]}??????`}
                    </TargetContent>
                    )}
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            ????????????
                        </AnswerPrevBtn>
                        <AnswerNextBtn onClick={() => {
                            if (window.confirm("????????? ????????? ?????????????")) { onSubmit() }
                        }}>
                            ?????? ????????????
                        </AnswerNextBtn>
                    </BtnContainer>
                </TargetContainer>
            )}
            {!(step === 6) && 
            <TargetContainer>
                <TargetContent>
                    {level && `${level}?????? ??????`}
                </TargetContent>
                {levelArr && levelArr.map(levelContent => 
                    <TargetContent>
                        {levelContent[0] && `${levelContent[0]}?????? `} 
                        {levelContent[1] && ` ${levelContent[1]}`} 
                        {levelContent[2] && `, ${levelContent[2]}`} 
                        {levelContent[3] && ` : ${levelContent[3]}??????`}
                    </TargetContent>
                )}
            </TargetContainer>
            }
            </>
            }
            <HomeBtn onClick={goHome}>
                ?????????
            </HomeBtn>
        </Container>
    )
}

export default PlanFinding;