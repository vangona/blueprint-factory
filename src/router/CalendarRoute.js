import React, { useEffect, useState } from 'react';
import locale from 'antd/es/calendar/locale/ko_KR';
import styled from 'styled-components';
import { defaultContainer } from '../css/styleConstants';
import { Calendar } from 'antd';

const Container = styled.div`
    ${defaultContainer};
    padding-top: 70px;
`;

const CalendarRoute = ({userObj}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [schedules, setSchedules] = useState([]);

    const getDeadlines = (targets) => {
        const filtered = targets.filter(el => el.deadline);
        setSchedules(filtered);
        setIsLoading(false);
    }

    const dateCellRender = (value) => {
        console.log(value.date());
    }

    useEffect(() => {
        getDeadlines(userObj.targets);
    }, [])

    return (
        <>
        {isLoading
            ? "Loading..."
            : 
            <Container>
                <Calendar 
                    locale={locale} 
                    dateCellRender={dateCellRender}
                />
            </Container>
        }
        </>
    );
};

export default CalendarRoute;
