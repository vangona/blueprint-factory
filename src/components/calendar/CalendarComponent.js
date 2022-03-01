import React, { useEffect, useState } from "react";
import locale from "antd/es/calendar/locale/ko_KR";
import styled from "styled-components";
import { Calendar } from "antd";
import { defaultContainer } from "../../css/styleConstants";

const Container = styled.div`
  ${defaultContainer};
`;

const Header = styled.div`
  font-family: Ssurround;
  font-size: 22px;
`;

const CalendarContainer = styled.div`
  width: 100%;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 18px;
  gap: 2px;
`;

const Bar = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 5px;
`;

function CalendarComponent({ getSelected, schedules }) {
  const Now = new Date(Date.now());

  const [year, setYear] = useState(Now.getFullYear());
  const [month, setMonth] = useState(Now.getMonth() + 1);

  const getListData = (value) => {
    const listData = schedules.filter((el) => {
      const Time = new Date(el.deadline.seconds * 1000);
      const YearTime = Time.getFullYear();
      const MonthTime = Time.getMonth() + 1;
      const DateTime = Time.getDate();
      return Boolean(
        DateTime === value.date() &&
          MonthTime === value.month() + 1 &&
          YearTime === value.year()
      );
    });
    return listData;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <BarContainer>
        {listData.map((el, index) => (
          <Bar
            key={index}
            style={{
              backgroundColor:
                el.type === "longterm"
                  ? "blue"
                  : el.type === "shortterm"
                  ? "red"
                  : "skyblue",
            }}
          />
        ))}
      </BarContainer>
    );
  };

  const getMonthData = (value) => {
    const listData = schedules.filter((el) => {
      const Time = new Date(el.deadline.seconds * 1000);
      const YearTime = Time.getFullYear();
      const MonthTime = Time.getMonth() + 1;
      return Boolean(
        YearTime === value.year() && MonthTime === value.month() + 1
      );
    });
    return listData;
  };

  const monthCellRender = (value) => {
    const listData = getMonthData(value);
    return (
      <BarContainer>
        {listData.map((el, index) => (
          <Bar
            key={index}
            style={{
              backgroundColor:
                el.type === "longterm"
                  ? "blue"
                  : el.type === "shortterm"
                  ? "red"
                  : "skyblue",
            }}
          />
        ))}
      </BarContainer>
    );
  };

  const onSelect = (value) => {
    getSelected(value);
    setYear(value.year());
    setMonth(value.month() + 1);
  };

  return (
    <Container>
      <Header>
        {year}년 {month}월
      </Header>
      <CalendarContainer>
        <Calendar
          locale={locale}
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          onSelect={onSelect}
          fullscreen={false}
        />
      </CalendarContainer>
    </Container>
  );
}

export default CalendarComponent;
