import React from 'react'
import {Link} from 'react-router-dom';


const Row = (faculty, index) => {
    return <tr key={faculty.id}>
        <td>{index + 1}</td>
        <td>
            <Link to={`/administration/faculties/${faculty.id}`}
                  state={faculty}>{faculty.name}</Link>
        </td>
        <td>{faculty.shortname}</td>
    </tr>
}

export const FacultyList = ({faculties}) => {

    if (!faculties.length) {
        return <p className="center">Список факультетов загружается</p>
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">Список факультетов</li>
                </ol>
            </nav>

            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th colSpan={2}>Факультеты</th>
                </tr>
                </thead>
                <tbody>
                {faculties.map((faculty, index) => {
                    return Row(faculty, index)
                })}
                </tbody>
            </table>
        </>
    );
}
