import React = require("react");

import {groupingBy, sortObject} from "../../../../hooks/helpers";
import {Link} from "react-router-dom";
import {withParams} from "../../../helpers";
import {GroupInterface} from "../../../../models/Group";
import {Faculty, FacultyInterface} from "../../../../models/Faculty";
import {FacultyEios} from "../../../../api/eios/FacultyEios";
import {GroupEios} from "../../../../api/eios/GroupEios";

interface TableGroupsInteface {
    groups: [[GroupInterface]],
    faculty: FacultyInterface
}

class GroupsPage extends React.Component {
    state = {
        faculty: new Faculty(),
        faculty_id: 0,
        groups: []
    }

    componentDidMount() {
        // @ts-ignore
        let {faculty_id} = this.props.params;

        this.setState({
            faculty_id: faculty_id
        })

        this.request(faculty_id)
    }

    async request(faculty_id) {
        const groups = await new GroupEios().filter({faculty_id: faculty_id}).all();
        const faculty = await new FacultyEios().filter({faculty_id: faculty_id}).first();

        this.setState({groups: groups, faculty: faculty,})
    }

    render() {
        // console.log('faculty', this.state.groups);
        const {faculty, groups} = this.state;

        if (groups.length && faculty.hasOwnProperty('id')) {
            return <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={`/administration/faculties`}>Список факультетов</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Список групп {faculty && `(${faculty.shortname})`}</li>
                    </ol>
                </nav>
                <TableComponent faculty={faculty} groups={sortObject(groupingBy(groups, 'edu_level'))}/>
            </>;
        } else {
            return ''
        }
    }
}

class TableComponent extends React.Component<TableGroupsInteface> {
    state = {
        tbody: null
    }

    thead(level) {
        let title = 'Бакалавры';

        if (level.includes('06'))
            title = 'Аспиранты';
        else if (level.includes('04'))
            title = 'Магистры';

        return <tr key={level}>
            <td colSpan={3}>{title}</td>
        </tr>;
    };

    trow(indx: number, group) {
        return <tr key={indx}>
            <td>{indx + 1}</td>
            <td>
                <Link to={`/administration/faculties/${this.props.faculty.id}/group/${group.id}`}
                      state={{faculty: this.props.faculty, group: group}}>{group.number}</Link>
            </td>
            <td>{group.course}</td>
        </tr>
    }

    formating() {
        let items = {};
        let result = [];

        for (let level in this.props.groups) {
            items[level] = {
                header: this.thead(level),
                groups: this.props.groups[level].map((group, index) => {
                    return this.trow(index, group);
                })
            };
        }

        for (let item in items) {
            result.push(items[item].header);
            result.push(items[item].groups);
        }

        this.setState({
            tbody: result
        });
    };

    componentDidMount() {
        this.formating();
    }

    render() {
        return <table className="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Группа</th>
                <th>Курс</th>
            </tr>
            </thead>
            <tbody>
            {this.state.tbody}
            </tbody>
        </table>;
    }
}

export default withParams(GroupsPage);