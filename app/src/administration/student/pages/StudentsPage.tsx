import React = require("react");

import {withParams} from "../../../helpers";
import {Link} from "react-router-dom";
import {Faculty} from "../../../../models/Faculty";
import {Student} from "../../../../models/Student";
import {StudentEios} from "../../../../api/eios/StudentEios";
import {FacultyEios} from "../../../../api/eios/FacultyEios";

class StudentsPage extends React.Component {
    state = {
        faculty: new Faculty(),
        group_id: null,
        students: [new Student()]
    }

    componentDidMount() {
        // @ts-ignore
        const {group_id, faculty_id} = this.props.params;

        this.setState({group_id: group_id, faculty_id: faculty_id});

        this.request(group_id, faculty_id);
    }

    async request(group_id, faculty_id) {
        const students = await new StudentEios().filter({group_id: group_id}).all();
        const faculty = await new FacultyEios().filter({faculty_id: faculty_id}).first();

        this.setState({students: students, faculty: faculty})
    }

    render() {
        const students_link = '';

        if (this.state.students.length) {
            const faculty = this.state.faculty

            const back_link = `/administration/faculties/${faculty.id}`
            const students_link = `${back_link}/group/${this.state.group_id}`;

            return <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={`/administration/faculties`}>Список факультетов</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={back_link}>Список групп {`(${faculty.shortname})`}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Состав группы</li>
                    </ol>
                </nav>

                <div className={'my-3'}>
                    {
                        this.state.students[0].student_type != 'aspirant' &&
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
                    {this.state.students.map((student, index) => {
                        return <tr key={student.id + student.student_type}>
                            <td>{index + 1}</td>
                            <td>
                                <a href={`${students_link}/${student.student_type}/${student.id}`}>{student.fullname}</a>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </>
        }
    }
}

export default withParams(StudentsPage)