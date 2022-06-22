import React, {useCallback, useState, useEffect} from "react";

import {useHttp} from "../hooks/http.hook";
import {groupingBy} from "../hooks/helpers";
import {GroupList} from "../components/GroupList";


class GroupModel {
    constructor(props) {
        this.id = props.id;
        this.course = props.course;
        this.edu_level = props.edu_level;
        this.faculty_id = props.faculty_id;
        this.group_type = props.group_type;
        this.number = props.number;
    }
}

export const Group = (query = '') => {
    const {loading, request} = useHttp();
    const [groups, setGroups] = useState({});

    const fetchGroups = useCallback(async () => {
        try {
            let data = await request('/api/groups?' + query, 'GET', null);
            data = data.response.sort((a, b) => a.course - b.course); // sort by course

            let group_list = data.map((group, index) => {
                return new GroupModel(group);
            })
            setGroups(group_list);
        } catch (e) {
            console.log(e)
        }
    }, [request]);

    useEffect(() => {
        fetchGroups()
    }, [fetchGroups]);

    if (!loading) {
        return groups;
    }

    return {};
}