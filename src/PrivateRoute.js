import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute ({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {props => 
                localStorage.getItem('ishappy')?(
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

export default PrivateRoute;