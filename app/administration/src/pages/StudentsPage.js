'use strict';

import React, {useState} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {useParams} from 'react-router-dom'
import {StudentList} from "../../../components/StudentList";
import {Student} from "../../../models/Student";
import {Loader} from "../../../components/loader";
import {FacultyHistory} from "../../../models/Faculty";


export const StudentsPage = () => {
    const {loading, request} = useHttp();
    const params = useParams();
    const students = Student('group_id=' + params.group_id);
    const faculty = FacultyHistory();

    if (Object.keys(students).length) {
        return (
            <div className="student_list">
                {<StudentList params={params} students={students.response}/>}
            </div>
        );
    } else {
        return <Loader/>
    }
}
