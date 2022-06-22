'use strict';

import React, {useReducer} from "react";
import {BrowserRouter as Router, Link, Routes} from 'react-router-dom';
import {useRoutes} from '../routes';

import PropTypes from 'prop-types';
import {ThroughProvider} from 'react-through';
import ReactDOM from "react-dom";


export var titles = {
    faculty: {},
    group: {},
}

export const reducer = (state, action) => {
    console.log(state)
    switch (action.type) {
        case titles.faculty:
            return {...state, faculty: action.value}
        case titles.group:
            return {...state, group: action.value}
    }
}

const AdministrationApp = () => {
    const [state, dispatch] = useReducer(reducer, titles)
    const routes = useRoutes(null);

    return (
        <>
            <Router>
                <div className={'routersClass'}>
                    {routes}
                </div>
            </Router>
        </>
    );
}

ReactDOM.render(
    <ThroughProvider>
        <AdministrationApp/>
    </ThroughProvider>
    , document.getElementById('root'));
