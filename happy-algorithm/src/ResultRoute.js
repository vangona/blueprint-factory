import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ResultRoute ({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {props => 
                localStorage.getItem('plan_happy_algoritm') !== null?(
                    <Component {...props} />
                ) : ( 
                    <Redirect to={{
                                    pathname: '/', 
                                    state: {from: props.location}
                                  }}
                    />
                )
            }
        />
    )
}

export default ResultRoute;