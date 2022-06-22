'use strict';

import React, {useCallback, useState, useEffect} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {Loader} from "../../../components/loader";
import "regenerator-runtime/runtime";
import {FacultyList} from "../../../components/FacultyList";
import {Faculty} from "../../../models/Faculty";


export const FacultiesPage = () => {
    const {loading} = useHttp()
    const faculties = Faculty();

    if (faculties.length === 0) {
        return <Loader/>
    }

    return (
        <div className="faculty_list">
            {!loading && <FacultyList faculties={faculties}/>}
        </div>
    );
}
