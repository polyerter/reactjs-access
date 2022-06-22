'use strict';

import React, {useState} from "react";
import {GroupList} from "../../../components/GroupList";
import {useLocation, useParams} from 'react-router-dom'
import {Group} from "../../../models/Group";
import {Loader} from "../../../components/loader";
import {groupingBy, sortObject} from "../../../hooks/helpers";
import {Faculty, FacultyHistory} from "../../../models/Faculty";


export const GroupsPage = () => {
    const groups = Group('faculty_id=' + useParams().faculty_id);
    const faculty = FacultyHistory();

    if (Object.keys(groups).length) {
        let grouping_data = groupingBy(groups, 'edu_level');
        grouping_data = sortObject(grouping_data);

        return (
            <div className="group_list">
                <GroupList faculty={faculty} groups={grouping_data}/>
            </div>
        );
    } else {
        return <Loader/>
    }
};
