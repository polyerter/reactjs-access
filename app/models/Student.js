import React, {useCallback, useState, useEffect} from "react";

import {useHttp} from "../hooks/http.hook";
import {groupingBy, sortObject} from "../hooks/helpers";
import {GroupList} from "../components/GroupList";


class StudentModel {
    constructor(props) {
        this.id = props.id;
        this.fullname = props.fullname;
        this.firstname = props.firstname;
        this.secondname = props.secondname;
        this.lastname = props.lastname;
        this.course = props.course;
        this.faculty_id = props.faculty_id;
        this.group_number = props.group_number;
        this.special_code = props.special_code;
        this.group_id = props.group_id;
        this.student_type = props.student_type;
        this.group_id = props.edu_level;
    }
}

export const Student = (query = '') => {
    const {loading, request} = useHttp();
    const [students, setStudents] = useState([]);

    const fetchStudents = useCallback(async () => {
        try {
            const data = await request('/api/students?' + query, 'GET', null);
            setStudents(data);
        } catch (e) {
            console.log(e)
        }
    }, [request]);

    useEffect(() => {
        fetchStudents()
    }, [fetchStudents])

    if (!loading) {
        return students;
    }

    return {};
}