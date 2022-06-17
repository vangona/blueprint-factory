import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import Loading from "../components/Loading";
import { authService, dbService, firebaseInstance } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 150px;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100vh;
    font-family: Kyobo Handwriting;
`;

const ProfileContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
`;

const DisplayName = styled.h3`
    margin-bottom: 10px;
`;

const Label = styled.label`
    margin-bottom: 5px;
`;

const DisplayNameInput = styled.input`
    width: 90%;
`;

const DisplayNameSubmit = styled.button`
    width: 90%;
    background-color: white;
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`

const DreamSelectorContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px;
    gap: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
`;

const DreamSelector = styled.select`
    padding: 3px;
    width: 90%;
`;

const DreamSelectorOption = styled.option``;

const DreamSelectorBtn = styled.button`
    width: 90%;
    background-color: white;
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const DreamLabel = styled.label``;

const DreamContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
`;

const DreamInput = styled.input`
    width: 90%;
`;

const DreamBtn = styled.button`
    width: 90%;
    background-color: white;
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const LogoutBtn = styled.button`
    margin: 10px;
    background-color: white;
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const Profile = ({userObj, refreshUser}) => {
    const [dream, setDream] = useState('');
    const [profileData, setProfileData] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [displayDream ,setDisplayDream] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    
    const getDreamArray = () => {
        dbService.collection(`${userObj.uid}`).doc("profile").onSnapshot(snapshot => {
            setProfileData(snapshot.data());
            setIsLoading(false);
        })
    }

    const onDreamSubmit = async () => {
        await dbService.collection(`${userObj.uid}`).doc("profile").update({
            dreamArray: firebaseInstance.firestore.FieldValue.arrayUnion(dream)
        })
        .then(() => {
            setDream("");
            alert("잘 설정 됐습니다.");
        })
    }

    const onDisplayDreamSubmit = async () => {
        await dbService.collection(`${userObj.uid}`).doc("profile").update({
            dream: displayDream,
        }).then(refreshUser(dream))
    }

    const onDisplayNameSubmit = () => {
        userObj.updateProfile({
            displayName
        })
        refreshUser();
        setDisplayName('');
    }

    const onChange = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "dream")
            setDream(e.target.value);
        if (name === "displayName") {
            setDisplayName(e.target.value);
        }
        if (name === "displayDream") {
            setDisplayDream(e.target.value);
        }
    }

    const signOut = (e) => {
        e.preventDefault();
        authService.signOut();
        history.push("/")
    }

    useEffect(() => {
        getDreamArray();
        console.log(userObj)
    }, [])

    return (
        <Container>
            {!isLoading ?
            <>
                <DisplayName>{userObj.dream}한 사람이 꿈인 {userObj.displayName}</DisplayName>
                <ProfileContainer>
                    <Label>이름</Label>
                    <DisplayNameInput onChange={onChange} name="displayName" value={displayName} type="text" />
                    <DisplayNameSubmit onClick={onDisplayNameSubmit}>이름 바꾸기</DisplayNameSubmit>
                </ProfileContainer>
                <DreamSelectorContainer>
                    <Label>꿈</Label>
                    <DreamSelector onChange={onChange} name="displayDream" defaultValue={userObj.dream}>
                        {profileData.dreamArray.map((dreamData) => 
                        <DreamSelectorOption>
                            {dreamData}
                        </DreamSelectorOption>
                        )}
                    </DreamSelector>
                    <DreamSelectorBtn onClick={onDisplayDreamSubmit}>고르기</DreamSelectorBtn>
                </DreamSelectorContainer>
                <DreamContainer>
                    <Label>새로운 꿈</Label>
                    <DreamLabel>내 꿈은 </DreamLabel>
                    <DreamInput onChange={onChange} value={dream} name= "dream" type="text" />
                    <DreamBtn onClick={onDreamSubmit}>한 사람</DreamBtn>
                </DreamContainer>
                <LogoutBtn onClick={signOut}>Log Out</LogoutBtn>
            </>
            : <Loading />
            }
        </Container>
    )
}

export default Profile;