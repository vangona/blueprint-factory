import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import { ImCross } from "react-icons/im"
import { dbService } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: center;
    align-items: center;
`;

const Line = styled.hr`
    width: 90%;
    border: white 1px solid;
    margin: 15px;
`;

const ReasonInput = styled.input``;

const TargetContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    word-break: keep-all;
    justify-content: center;
    align-items: center;
`;

const TargetName = styled.h3``;

const NeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NeedLabel = styled.h5`
    font-weight: bold;
    margin-bottom: 10px;
`;

const Need = styled.h5``;

const Date = styled.h3``;

const TargetBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

const TargetCompletehBtn = styled.button`
    color: green;
    font-size: 20px;
`;

const TargetCancelBtn = styled.button`
    font-size: 14px;
    color: red;
`;

const Shortterm = ({target, userObj}) => {
    const [btnState, setBtnState] = useState(``);
    const [completeFeeling, setCompleteFeeling] = useState('');
    const [cancelReason, setCancelReason] = useState('');

    const onClickComplete = async () => {
        if (completeFeeling && btnState) {
            const completeObj = {
                completeFeeling,
                state: "complete"
            }
            await dbService.collection(`${userObj.uid}`).doc(`${target.targetId}`).update(completeObj)
            .then(() => {
                alert("고생하셨습니다.")
                setCompleteFeeling('');
                setBtnState('');
            })
        } else if (btnState && !completeFeeling) {
            setBtnState('');
        } else {
            setBtnState("complete")
        }
    }

    const onClickCancel = async () => {
        if (cancelReason && btnState) {
            const cancelObj = {
                cancelReason,
                state: "cancel"
            }
            await dbService.collection(`${userObj.uid}`).doc(`${target.targetId}`).update(cancelObj)
            .then(() => {
                alert("고생하셨습니다.")
                setCancelReason('');
                setBtnState('');
            })
        } else if (btnState && !cancelReason) {
            setBtnState('');
        } else {
            setBtnState("cancel")
        }
    }

    const onChange = (e) => {
        const name = e.target.getAttribute("name") 
        if (name === "complete") {
            setCompleteFeeling(e.target.value);
        }
        if (name === "cancel") {
            setCancelReason(e.target.value);
        }
    }
    
    return (
        <Container>
            <Line />
            <TargetContent key={target.targetId}>
                <TargetName>
                    {target.want}
                </TargetName>
                <Date>
                    {target.date}까지
                </Date>
                <NeedContainer>
                    <NeedLabel>필요한 것</NeedLabel>
                    {target.needArr.map((need, index) => 
                        <Need>
                            {need}, {target.numericValueArr[index]}
                        </Need>    
                    )}
                </NeedContainer>
                {btnState === "complete" && 
                <ReasonInput onChange={onChange} type="text" name="complete" />
                }
                {btnState === "cancel" && 
                <ReasonInput onChange={onChange} type="text" name="cancel" />
                }
                <TargetBtnContainer>
                    <TargetCompletehBtn onClick={onClickComplete} className="target__btn">
                        <AiOutlineCheck />
                    </TargetCompletehBtn>
                    <TargetCancelBtn onClick={onClickCancel} className="target__btn">
                        <ImCross />
                    </TargetCancelBtn>
                </TargetBtnContainer>
            </TargetContent>
        </Container>
    )
}

export default Shortterm;