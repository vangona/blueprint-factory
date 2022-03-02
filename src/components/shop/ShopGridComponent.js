import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;
const ProductImg = styled.img`
  height: 70%;
`;
const ProductName = styled.span`
  display: flex;
  padding: 5px;
  word-break: keep-all;
  font-family: SsurroundAir;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 30%;
`;

function ShopGridComponent({ shop }) {
  console.log(shop);
  return (
    <Container>
      <ProductImg alt="" />
      <ProductName>
        {shop}
      </ProductName>
    </Container>
  );
};

export default ShopGridComponent;