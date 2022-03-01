import React from 'react';
import CalendarRoute from 'components/home/CalendarRoute';

const TodolistCalendar = ({ userObj, todayTargets }) => {
  return (
    <>
      <CalendarRoute userObj={userObj} todayTargets={todayTargets} />
    </>
  );
};

export default TodolistCalendar;