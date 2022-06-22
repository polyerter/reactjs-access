import React, {Fragment} from 'react';

import {Route, Routes} from 'react-router-dom'
import {FacultiesPage} from './src/pages/FacultiesPage';
import {GroupsPage} from "./src/pages/GroupsPage";
import {StudentsPage} from "./src/pages/StudentsPage";

const routes = [
    {
        path: "/administration/faculties", name: "Faculties Page", Component: FacultiesPage,
        children: [
            {
                path: "/:faculty_id",
                name: "Groups Page",
                Component: GroupsPage,
                children: [
                    {
                        path: "/group/:group_id",
                        name: "Students Page",
                        Component: StudentsPage
                    },
                ]
            },
        ]

    },
];

export const createMyRouteList = (router_list, parent_path, key = 0) => {
    return router_list.map(({path, name, Component, children}) => {
        key++;
        path = parent_path + path;
        return createMyRoute({path, name, Component, children, key});
    });
}

export const createMyRoute = (route) => {
    const childs = route.children ? createMyRouteList(route.children, route.path, route.key) : '';

    const Component = route.Component;

    return <Fragment key={route.key}>
        <Route path={route.path} key={route.key} name={route.name} element={<Component/>}/>
        {childs}
    </Fragment>
};

export const useRoutes = () => {
    const route_list = createMyRouteList(routes, '');

    return (
        <Routes>
            {route_list}
        </Routes>
    );
}
