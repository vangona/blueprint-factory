import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import { v4 as uuidv4} from "uuid";
import { storageService } from '../../fBase';
import imageCompression from "browser-image-compression";

const Container = styled.div`
    ${defaultContainer};
`;

const ProfileContainer = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const ProfileBox = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 30px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    ${defaultBtnAction};
`;

const PicUploader = styled.input`
    display: none;
`;

const ProfilePic = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

const DisplayName = styled.h1`
    font-family: Ssurround;
`;

const SubmitBtn = styled.button``;

const SettingUpperComponent = ({userObj, refreshUser}) => {
    const [attachment, setAttachment] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = ""
        if (attachment !== '') {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/bio/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, "data_url")
            attachmentUrl = await response.ref.getDownloadURL();
            await userObj.updateProfile({
                photoURL: attachmentUrl,
            });
            refreshUser();
        }
    }

    const onFileChange = async (event) => {
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1024,
        }
        try {
            const {target: { files }} = event;
            const theFile = files[0];
            const compressedFile = await imageCompression(theFile, options);
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = (finishedEvent) => {
                const {currentTarget: {result}} = finishedEvent
                setAttachment(result)
            }
        } catch (error) {
            console.log(error);
        };
    }

    return (
        <Container>
            <ProfileContainer>
                <ProfileBox htmlFor="profile__pic">
                    {userObj.photoURL 
                        ? <ProfilePic src={userObj.photoURL} />
                        : <AiOutlineUser />
                    }
                </ProfileBox>
                <PicUploader id="profile__pic" onChange={onFileChange} type="file" />
                <DisplayName>{userObj.displayName}</DisplayName>
                <SubmitBtn onClick={onSubmit}>변경사항 적용하기</SubmitBtn>
            </ProfileContainer>
        </Container>
    );
};

export default SettingUpperComponent;