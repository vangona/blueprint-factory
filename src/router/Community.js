import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommunityWindow from "../components/community/CommunityWindow";
import CommunityUpperComponent from "../components/community/CommunityUpperComponent";
import { defaultContainer } from "../css/styleConstants";
import CommunityLowerComponent from "../components/community/CommunityLowerComponent";
import { dbService } from "../fBase";
import Loading from "../components/loading/Loading";
import ReturnBtn from "../components/btn/ReturnBtn";

const Container = styled.div`
  ${defaultContainer};
  justify-content: flex-start;
  padding-bottom: var(--nav-height);
`;

function Community({ userObj }) {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const getUsers = () => {
    dbService.collection("users").onSnapshot((querySnapshot) => {
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
      setIsLoading(false);
    });
  };

  const getSearchWord = (value) => {
    setSearchWord(value);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <ReturnBtn />
      <CommunityUpperComponent
        userObj={userObj}
        users={users}
        getSearchWord={getSearchWord}
        searchWord={searchWord}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <CommunityLowerComponent
          userObj={userObj}
          users={users}
          searchWord={searchWord}
        />
      )}
    </Container>
  );
}

export default Community;
