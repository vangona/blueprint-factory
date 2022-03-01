import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "components/loading/Loading";
import { defaultContainer } from "css/styleConstants";
import { dbService } from "fBase";
import PrevBtn from "components/btn/PrevBtn";
import TodolistToday from "components/home/TodolistToday";
import TodolistCalendar from "components/home/TodolistCalendar";

const Container = styled.div`
  ${defaultContainer}
  padding-top: var(--nav-height);
`;

function Home({ userObj }) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [todayTargets, setTodayTargets] = useState([]);

  const getTodayTarget = async () => {
    const today = new Date(Date.now());
    await dbService
      .collection("targets")
      .where("uid", "==", `${userObj.uid}`)
      .where("deadline", "!=", "")
      .get()
      .then((snapshot) => {
        const targets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filtered = targets.filter((el) => {
          const Time = new Date(el.deadline.seconds * 1000);
          const YearTime = Time.getFullYear();
          const MonthTime = Time.getMonth() + 1;
          const DateTime = Time.getDate();
          return Boolean(
            DateTime === today.getDate() &&
              MonthTime === today.getMonth() + 1 &&
              YearTime === today.getFullYear()
          );
        });
        setTodayTargets(filtered);
      });
    setTimeout(setIsLoading(false), []);
  };

  const onWheel = e => {
    if (e.deltaY > 0) {
      setPage(2);
    }

    if (e.deltaY < 0) {
      setPage(1);
    }
  }

  useEffect(() => {
    window.addEventListener('wheel', onWheel);
    getTodayTarget();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PrevBtn />
          {page === 1 
            ? <TodolistToday userObj={userObj} todayTargets={todayTargets} /> 
            : <TodolistCalendar userObj={userObj} />
          }
        </>
      )}
    </Container>
  );
}

export default Home;
