import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../css/styleConstants';
import CalendarComponent from '../components/calendar/CalendarComponent';
import EventComponent from '../components/calendar/EventComponent';
import Loading from '../components/loading/Loading';

const Container = styled.div`
    ${defaultContainer};
    padding: 40px 0 var(--nav-height) 0;
    height: auto;
`;

const CalendarRoute = ({userObj}) => {
    const [selected, setSelected] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [schedules, setSchedules] = useState([]);

    const getDeadlines = () => {
        const steps = userObj.steps;
        const filtered = userObj.targets.filter(el => el.deadline);
        setSchedules([...filtered, ...steps]);
        setIsLoading(false);
    }

    const getSelected = (value) => {
        const listData = schedules.filter(el => {
            const Time = new Date(el.deadline.seconds * 1000);
            const YearTime = Time.getFullYear();
            const MonthTime = Time.getMonth() + 1;
            const DateTime = Time.getDate();
            return Boolean(DateTime === value.date() && MonthTime === value.month() + 1 && YearTime === value.year());
        })
        setSelected(listData);
    }

    useEffect(() => {
        getDeadlines();
    }, [])

    return (
        <>
        {isLoading
        ? <Loading />
        : <Container>
            <CalendarComponent getSelected={getSelected} schedules={schedules} />
            <EventComponent selected={selected} />
        </Container>}
        </>
    );
};

export default CalendarRoute;
