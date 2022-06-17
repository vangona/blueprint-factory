import React from 'react';
import HomeLowerComponent from './HomeLowerComponent';
import HomeUpperComponent from './HomeUpperComponent';

const TodolistToday = ({ userObj, todayTargets }) => {
  return (
    <>
      <HomeUpperComponent userObj={userObj} todayTargets={todayTargets} />
      <HomeLowerComponent userObj={userObj} todayTargets={todayTargets} />
    </>
  );
};

export default TodolistToday;