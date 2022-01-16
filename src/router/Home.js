import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeLowerComponent from '../components/home/HomeLowerComponent';
import HomeUpperComponent from '../components/home/HomeUpperComponent';
import Loading from '../components/loading/Loading';
import { defaultContainer } from '../css/styleConstants';
import { dbService } from '../fBase';

const Container = styled.div`
  ${ defaultContainer }
  padding-top: var(--nav-height);
`;

const Home = ({userObj}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todayTargets, setTodayTargets] = useState([]);

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
      setTimeout(setIsLoading(false), []);
  }

  useEffect(() => {
      getTodayTarget();
  }, []);

  return (
    <Container>
      {isLoading 
      ? <Loading />
      : 
      <>
        <HomeUpperComponent userObj={userObj} todayTargets={todayTargets}/>
        <HomeLowerComponent userObj={userObj} todayTargets={todayTargets}/>
      </>
      }
    </Container>
  );
}

export default Home;
