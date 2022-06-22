import React, {useCallback, useState, useEffect} from "react";

import {useHttp} from "../hooks/http.hook";
import {useLocation, useParams} from "react-router-dom";
import {titles} from "../administration/src/app";


class FacultyModel {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.shortname = props.shortname;
    }
}

export const Faculty = (query = '') => {
    const {loading, request} = useHttp();
    const [faculties, setFaculties] = useState([]);

    const fetchFaculties = useCallback(async () => {
        try {
            const data = await request('/api/faculties/?' + query, 'GET', null);
            let fasulty_list = data.response.map((faculty, index) => {
                return new FacultyModel(faculty)
            })

            setFaculties(fasulty_list);
        } catch (e) {
            console.log(e)
        }
    }, [request])

    useEffect(() => {
        fetchFaculties()
    }, [fetchFaculties])

    return faculties;
}

export const FacultyHistory = () => {
    const params = useParams();

    const location = useLocation();
    let faculty = null;

    if (location.state && location.state.faculty && location.state.faculty.id) {
        faculty = location.state.faculty;
    } else if (params && params.faculty_id) {
        faculty = Faculty('faculty_id=' + params.faculty_id);
        if (faculty) {
            faculty = faculty[0]
        }
    }

    return faculty
}