import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeLowerComponent from '../components/home/HomeLowerComponent';
import HomeUpperComponent from '../components/home/HomeUpperComponent';
import { defaultContainer } from '../css/styleConstants';
import { dbService } from '../fBase';

const Container = styled.div`
  ${ defaultContainer }
  padding-top: 30px;
`;

const Home = ({userObj}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todayTargets, setTodayTargets] = useState([]);
  const [todaySteps, setTodaySteps] = useState([]);

  const getTodayTarget = () => {
      const today = new Date(Date.now());
      dbService.collection("targets").where("uid", "==", `${userObj.uid}`).onSnapshot(snapshot => {
        const targets = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        const filtered = targets.filter(el => {
          const Time = new Date(el.deadline.seconds * 1000);
          const YearTime = Time.getFullYear();
          const MonthTime = Time.getMonth() + 1;
          const DateTime = Time.getDate();
          return Boolean(DateTime === today.getDate() && MonthTime === today.getMonth() + 1 && YearTime === today.getFullYear());
        })
        setTodayTargets(filtered);
      })
      dbService.collection("steps").where("uid", "==", `${userObj.uid}`).onSnapshot(snapshot => {
        const steps = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        const filteredSteps = steps.filter(el => {
          const Time = new Date(el.deadline.seconds * 1000);
          const YearTime = Time.getFullYear();
          const MonthTime = Time.getMonth() + 1;
          const DateTime = Time.getDate();
          return Boolean(DateTime === today.getDate() && MonthTime === today.getMonth() + 1 && YearTime === today.getFullYear());
        })
        setTodaySteps(filteredSteps);
      })
      setTimeout(setIsLoading(false),[]);
  }

  useEffect(() => {
      getTodayTarget();
  }, []);

  return (
    <Container>
      {isLoading 
      ? "Loading..."
      : 
      <>
        <HomeUpperComponent userObj={userObj} todayTargets={todayTargets} todaySteps={todaySteps} />
        <HomeLowerComponent userObj={userObj} todayTargets={todayTargets} todaySteps={todaySteps} />
      </>
      }
    </Container>
  );
}

export default Home;
