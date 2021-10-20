import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import Loading from "../components/Loading";
import { authService, dbService, firebaseInstance } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const ProfileContainer = styled.div``;

const DisplayName = styled.h3``;

const DisplayNameLabel = styled.label``;

const DisplayNameInput = styled.input``;

const DisplayNameSubmit = styled.button``

const DreamSelectorContainer = styled.div``;

const DreamSelector = styled.select``;

const DreamSelectorOption = styled.option``;

const DreamSelectorBtn = styled.button``;

const DreamLabel = styled.label``;

const DreamContainer = styled.div``;

const DreamInput = styled.input``;

const DreamBtn = styled.button``;

const LogoutBtn = styled.button``;

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
        }).then(() => {
            userObj.updateProfile({dream : displayDream});
            refreshUser();
        })
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
    }, [])

    return (
        <Container>
            {!isLoading ?
            <>
                <ProfileContainer>
                    <DisplayName>{userObj.dream}한 사람이 꿈인 {userObj.displayName}</DisplayName>
                    <DisplayNameLabel>내 이름</DisplayNameLabel>
                    <DisplayNameInput onChange={onChange} name="displayName" value={displayName} type="text" />
                    <DisplayNameSubmit onClick={onDisplayNameSubmit}>제출하기</DisplayNameSubmit>
                </ProfileContainer>
                <DreamSelectorContainer>
                    <DreamSelector onChange={onChange} name="displayDream">
                        {profileData.dreamArray.map((dreamData) => 
                        <DreamSelectorOption>
                            {dreamData}
                        </DreamSelectorOption>
                        )}
                    </DreamSelector>
                    <DreamSelectorBtn onClick={onDisplayDreamSubmit}>고르기</DreamSelectorBtn>
                </DreamSelectorContainer>
                <DreamContainer>
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