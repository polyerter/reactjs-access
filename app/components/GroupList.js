import React from 'react'
import {Link, useLocation, useParams} from "react-router-dom";
import {Faculty} from "../models/Faculty";


const GroupRow = (props) => {
    const group = props.group;
    const index = props.number;
    const faculty = props.faculty;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <Link to={`/administration/faculties/${group.faculty_id}/group/${group.id}`}
                      state={{faculty: faculty, group: group}}>{group.number}</Link>
            </td>
            <td>
                {group.course}
            </td>
        </tr>
    )
}

const HeaderRow = (props) => {
    let title = 'Бакалавры';
    if (props.level.includes('06')) {
        title = 'Аспиранты';
    } else if (props.level.includes('04')) {
        title = 'Магистры';
    }

    return (
        <tr>
            <td colSpan={3}>{title}</td>
        </tr>
    );
};


export const GroupList = ({groups, faculty}) => {
    if (!Object.keys(groups).length) {
        return <p className="center">Список групп загружается</p>
    }

    let items = {};
    let result = [];
    let count = -1;

    for (let level in groups) {
        items[level] = {
            header: <HeaderRow level={level} key={level.toString()}/>,
            groups: groups[level].map((row, index) => {
                count++;
                return (
                    <GroupRow key={row.id} group={row} number={count} faculty={faculty}/>
                )
            })
        };
    }

    for (let item in items) {
        result.push(items[item].header);
        result.push(items[item].groups);
    }

    return (
        <>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={`/administration/faculties`}>Список факультетов</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Список групп {faculty && `(${faculty.shortname})`}</li>
                    </ol>
                </nav>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Группа</th>
                    <th>Курс</th>
                </tr>
                </thead>
                <tbody>
                {result}
                </tbody>
            </table>
        </>
    );
};

