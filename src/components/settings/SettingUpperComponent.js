import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import { v4 as uuidv4} from "uuid";
import { authService, dbService, storageService } from '../../fBase';
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

const DisplayNameInput = styled.input``;

const PrivateBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: SsurroundAir;
    gap: 5px;
`;

const CheckBox = styled.input``;

const Label = styled.label``;

const BioLabel = styled.label``;

const BioTextarea = styled.textarea``;

const SubmitBtn = styled.button``;

const SettingUpperComponent = ({userObj, refreshUser}) => {
    const [newName, setNewName] = useState(userObj.displayName);
    const [isPrivate, setIsPrivate] = useState(userObj.isPrivate);
    const [attachment, setAttachment] = useState('');
    const [newBio, setNewBio] = useState('');

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
            setAttachment('');
            refreshUser();
        }
        if (newName !== userObj.displayName) {
            await dbService.collection('users').doc(`${userObj.uid}`).update({
                displayName: newName,
            }).then(() => {
                userObj.updateProfile({
                    displayName: newName,
                })
                alert('성공적으로 변경되었습니다.')
                setNewName('');
                refreshUser();
            })
        }
        if (newBio) {
            await dbService.collection('users').doc(`${userObj.uid}`).update({
                bio: newBio
            }).then(() => {
                alert('성공적으로 변경되었습니다.')
            })
        }
        if (isPrivate !== userObj.isPrivate) {
            await dbService.collection('users').doc(`${userObj.uid}`).update({
                isPrivate,
            }).then(() => {
                alert('성공적으로 변경되었습니다.');
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }

    const onChange = e => {
        const name = e.target.getAttribute('name');
        if (name === 'displayName') {
            setNewName(e.target.value);
        } 
        if (name === 'bio') {
            setNewBio(e.target.value);
        }
        if (name === 'isPrivate') {
            setIsPrivate(e.target.checked);
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
                <PicUploader id="profile__pic" onChange={onFileChange} type="file" accept='image/*' />
                <DisplayName>{userObj.displayName}</DisplayName>
                <DisplayNameInput value={newName} name="displayname" onChange={onChange} type="text" />
                <PrivateBox>
                    <CheckBox name='isPrivate' type="checkbox" id='is-private' onChange={onChange} checked={isPrivate} />
                    <Label htmlFor='is-private'>제 청사진은 비밀로 할게요.</Label>
                </PrivateBox>
                <BioLabel></BioLabel>
                <BioTextarea value={newBio} name="bio" onChange={onChange} />
                <SubmitBtn onClick={onSubmit}>변경사항 적용하기</SubmitBtn>
            </ProfileContainer>
        </Container>
    );
};

export default SettingUpperComponent;