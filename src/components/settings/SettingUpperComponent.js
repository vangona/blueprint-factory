import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import BackgroundBottomCloud from "../background/BackgroundBottomCloud";
import { authService, dbService, storageService } from "../../fBase";
import {
  defaultBtn,
  defaultBtnAction,
  defaultContainer,
  returnBtn,
} from "../../css/styleConstants";

const profileSize = "80px";

const Container = styled.div`
  ${defaultContainer};
  height: 300vh;
`;

const ProfileContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  width: 100%;
  height: 100%;
`;

const ProfileBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
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

const Label = styled.label`
  font-family: SsurroundAir;
  ${defaultBtnAction};
`;

const DisplayNameInput = styled.input`
  border-radius: 10px;
  padding: 5px 10px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: space-between;
  align-items: center;
  font-family: SsurroundAir;
  gap: 20px;
`;

const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Line = styled.hr`
  width: 100%;
`;

const ToggleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 58px;
  height: 30px;
  background-color: var(--main-blue);
  border-radius: 15px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
`;

const Slider = styled.span`
  position: absolute;
  background-color: white;
  width: 26px;
  height: 26px;
  right: 2px;
  top: 2px;
  border-radius: 15px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  :hover {
    cursor: pointer;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const BioTextarea = styled.textarea`
  padding: 10px;
  border-radius: 10px;
`;

const SubmitBtn = styled.button`
  ${defaultBtnAction};
  ${defaultBtn};
`;

const ReturnBtn = styled.button`
  ${returnBtn};
`;

function SettingUpperComponent({ userObj, refreshUser }) {
  const navigate = useNavigate();
  const [newName, setNewName] = useState(userObj.displayName);
  const [isPrivate, setIsPrivate] = useState(userObj.isPrivate);
  const [attachment, setAttachment] = useState("");
  const [newBio, setNewBio] = useState(userObj.bio);

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/bio/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
      await userObj.updateProfile({
        photoURL: attachmentUrl,
      });
      setAttachment("");
      refreshUser();
    }
    if (newName !== userObj.displayName) {
      await dbService
        .collection("users")
        .doc(`${userObj.uid}`)
        .update({
          displayName: newName,
        })
        .then(() => {
          userObj.updateProfile({
            displayName: newName,
          });
          alert("성공적으로 변경되었습니다.");
        });
    }
    if (newBio) {
      await dbService
        .collection("users")
        .doc(`${userObj.uid}`)
        .update({
          bio: newBio,
        })
        .then(() => {
          alert("성공적으로 변경되었습니다.");
        });
    }
    if (isPrivate !== userObj.isPrivate) {
      await dbService
        .collection("users")
        .doc(`${userObj.uid}`)
        .update({
          isPrivate,
        })
        .then(() => {
          alert("성공적으로 변경되었습니다.");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const onChange = (e) => {
    const name = e.target.getAttribute("name");
    if (name === "displayname") {
      setNewName(e.target.value);
    }
    if (name === "bio") {
      setNewBio(e.target.value);
    }
    if (name === "isPrivate") {
      setIsPrivate(e.target.checked);
    }
  };

  const onFileChange = async (event) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
    };
    try {
      const {
        target: { files },
      } = event;
      const theFile = files[0];
      const compressedFile = await imageCompression(theFile, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const onClickReturn = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      {userObj.isVisitor 
        ? null
        :      
        <Container>
          <BackgroundBottomCloud />
          <ProfileContainer>
            <Box style={{ flexDirection: "column" }}>
              <ProfileBox htmlFor="profile__pic">
                {userObj.photoURL ? (
                  <ProfilePic src={userObj.photoURL} />
                ) : (
                  <FaUserCircle
                    fontSize={profileSize}
                    style={{ fill: "#3e83e1" }}
                  />
                )}
              </ProfileBox>
              <Label htmlFor="profile__pic">프로필 사진 변경하기</Label>
            </Box>
            <PicUploader
              id="profile__pic"
              onChange={onFileChange}
              type="file"
              accept="image/*"
            />
            <Box>
              <InnerBox>
                <Label htmlFor="display-name">이름</Label>
                <DisplayNameInput
                  id="display-name"
                  value={newName}
                  name="displayname"
                  onChange={onChange}
                  type="text"
                />
              </InnerBox>
              <Line />
            </Box>
            <Box>
              <InnerBox>
                <Label htmlFor="bio">소개글</Label>
                <BioTextarea
                  id="bio"
                  value={newBio}
                  name="bio"
                  onChange={onChange}
                />
              </InnerBox>
              <Line />
            </Box>
            <Box>
              <InnerBox>
                <Label htmlFor="is-private">청사진 공개</Label>
                <ToggleBox>
                  <ToggleSwitch
                    htmlFor="is-private"
                    style={{ backgroundColor: isPrivate && "#ccc" }}
                  >
                    <CheckBox
                      name="isPrivate"
                      type="checkbox"
                      id="is-private"
                      onChange={onChange}
                      checked={isPrivate}
                    />
                    <Slider style={{ left: isPrivate && "2px" }} />
                  </ToggleSwitch>
                  <Label>{isPrivate ? "비공개" : "공개"}</Label>
                </ToggleBox>
              </InnerBox>
              <Line />
            </Box>
            <ToggleBox>
              <SubmitBtn onClick={onSubmit}>변경사항 적용하기</SubmitBtn>
              <SubmitBtn onClick={onClickReturn}>돌아가기</SubmitBtn>
            </ToggleBox>
          </ProfileContainer>
        </Container>
      } 

    </>
  );
}

export default SettingUpperComponent;
