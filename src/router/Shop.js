import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultContainer } from "css/styleConstants";
import { dbService } from "fBase";
import Loading from "components/loading/Loading";
import PrevBtn from "components/btn/PrevBtn";
import ShopUpperComponent from "components/shop/ShopUpperComponent";
import ShopLowerComponent from "components/shop/ShopLowerComponent";

const Container = styled.div`
  ${defaultContainer};
  justify-content: flex-start;
  padding-bottom: var(--nav-height);
`;

function Shop({ userObj }) {
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
      <PrevBtn />
      <ShopUpperComponent
        userObj={userObj}
        users={users}
        getSearchWord={getSearchWord}
        searchWord={searchWord}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ShopLowerComponent
          userObj={userObj}
          users={users}
          searchWord={searchWord}
        />
      )}
    </Container>
  );
}

export default Shop;
