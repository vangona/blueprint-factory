import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';

const Container = styled.div`
  width: 50%;
`;

const DoughnutChart = () => {
    const data = [
      { name: "complished", value: 87, color: '#BBD0FF' }
    ];

    return (
        <Container>
            <PieChart 
              data={data}
              reveal={87}
              lineWidth={18}
              background='#F5F5F5'
              lengthAngle={360}
              rounded
              animate
              label={({ dataEntry }) => dataEntry.value + '%' }
              labelStyle={{
                fontFamily: 'SSurround',
                fontSize: '22px',
                fill: '#5390E2',
              }}
              labelPosition={0}
            />
        </Container>
    );
}
export default DoughnutChart;