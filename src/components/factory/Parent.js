import React from 'react';
import styled from 'styled-components';

const Parent = ({parent}) => {
    const ParentContainer = styled.div``;

    const ParentTitle = styled.div``;

    const ParentExplain = styled.div``;

    const ParentDeadline = styled.div``;

    return (
        <ParentContainer>
            <ParentTitle>
                {parent.name}
            </ParentTitle>
            <ParentExplain>
                {parent.explain}
            </ParentExplain>
            <ParentDeadline>
                {parent.deadline}까지
            </ParentDeadline>
        </ParentContainer>
    );
};

export default Parent;