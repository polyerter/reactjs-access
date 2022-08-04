import {useRoutes} from '../../routes';
import {BrowserRouter as Router, Link, Routes} from 'react-router-dom';

import ReactDOM from "react-dom";

const AdministrationApp = () => {
    return <Router>{useRoutes()}</Router>;
}

ReactDOM.render(<AdministrationApp/>, document.getElementById('root'));
