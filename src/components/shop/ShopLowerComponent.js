import React, { useEffect } from "react";
import styled from "styled-components";
import { defaultBtnAction, defaultContainer } from "css/styleConstants";
import ShopGridComponent from "./ShopGridComponent";

const Container = styled.div`
  ${defaultContainer};
  justify-content: flex-start;
  padding: 20px 20px 0 20px;
  gap: 20px;
  height: 80vh;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  min-height: 8%;
`;

const NavBox = styled.div`
  width: 100%;
  text-align: center;
  line-height: 45px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-family: SsurroundAir;
  font-weight: bold;
  font-size: 14px;
  color: var(--main-blue);
  :first-child {
    background-color: var(--main-blue);
    color: white;
  }
  ${defaultBtnAction};
`;

// const ContentContainer = styled.div`
//   display: flex;
//   padding: 10px 10px var(--nav-height) 10px;
//   flex-direction: column;
//   gap: 30px;
//   align-items: center;
//   justify-content: flex-start;
//   width: 90%;
//   height: 70vh;
//   overflow: scroll;
//   box-sizing: border-box;
//   ::-webkit-scrollbar {
//     width: 0;
//   }
// `;

const ShopGrid = styled.div`
  display: grid;
  height: 60vh;
  width: 85%;
  grid-template-rows: repeat(auto-fill, minmax(1fr, auto));
  grid-template-columns: repeat(4, 1fr);
  row-gap: 10px;
  column-gap: 10px;
`;

function ShopLowerComponent() {
  const shops = ['맛좋은 찐빵', '다이어트를 위한 운동 프로그램', '다이어트를 돕는 서비스', '1', '2', '3', '4','5', '6', '7', '8'];

  const waitPlz = () => {
    alert("준비중 입니다.");
  };

  const scrollRestoration = () => {
    const box = document.getElementById("friends");
    box.scrollTo(0, localStorage.getItem("blueprint_community_scroll"));
    localStorage.removeItem("blueprint_community_scroll");
  };

  useEffect(() => {
    if (localStorage.getItem("blueprint_community_scroll")) {
      scrollRestoration();
    }
  }, []);

  return (
    <Container>
      <NavContainer>
        <NavBox>코칭</NavBox>
        <NavBox onClick={waitPlz}>서비스</NavBox>
        <NavBox onClick={waitPlz}>제품</NavBox>
        <NavBox onClick={waitPlz}>어플리케이션</NavBox>
      </NavContainer>
      <ShopGrid>
        {shops.map((shop, index) => (
          <ShopGridComponent shop={shop} key={index} />
        ))}
      </ShopGrid>
    </Container>
  );
}

export default ShopLowerComponent;
