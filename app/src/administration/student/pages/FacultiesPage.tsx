import React = require("react");
import {Link} from "react-router-dom";

import {Faculty, FacultyInterface} from "../../../../models/Faculty";
import {FacultyEios} from "../../../../api/eios/FacultyEios";

class FacultiesPage extends React.Component {
    state = {
        faculties: [new Faculty()]
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const faculties = await new FacultyEios().all();

        this.setState({faculties: faculties});
    }

    render() {
        const rows = this.state.faculties.map((faculty, index) => {
            return <tr key={faculty.id + faculty.name}>
                <td>{index + 1}</td>
                <td>
                    <Link to={`/administration/faculties/${faculty.id}`}
                          state={faculty}>{faculty.name}</Link>
                </td>
                <td>{faculty.shortname}</td>
            </tr>
        })

        return <div className="faculty_list">
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
                    <tbody>{rows}</tbody>
                </table>
            </>
        </div>
    }
}

export default FacultiesPage;