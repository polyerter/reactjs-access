import React from 'react'
import {Link} from "react-router-dom";
import {FacultyHistory} from "../models/Faculty";


export const StudentList = ({students, params}) => {
    if (!students.length) {
        return <p className="center">Список группы загружается</p>
    }

    const group_id = params.group_id;
    const faculty_id = params.faculty_id;
    const back_link = `/administration/faculties/${faculty_id}`
    const students_link = `${back_link}/group/${group_id}`;
    const faculty = FacultyHistory();

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={`/administration/faculties`}>Список факультетов</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={back_link}>Список групп {faculty && `(${faculty.shortname})`}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Состав группы</li>
                </ol>
            </nav>

            <div className={'my-3'}>
                {
                    students[0].student_type != 'aspirant' &&
                    <a role="button" className={'btn btn-sm btn-tspu text-decoration-none me-3'}
                       href={`${students_link}/group_cps_to_file_export`} target={"_blank"}>
                        Результаты контрольных точек группы в Excel-файл
                    </a>
                }
                <a role="button" className={'btn btn-sm btn-tspu text-decoration-none'}
                   href={`${students_link}/group_marks_to_file_export`} target={"_blank"}>
                    Результаты промежуточных аттестаций (сессий) группы в Excel-файл
                </a>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>ФИО</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => {
                    return (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>
                                <a href={`${students_link}/${student.student_type}/${student.id}`}>{student.fullname}</a>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}