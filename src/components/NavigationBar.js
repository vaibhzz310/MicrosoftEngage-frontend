import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {logoutUser} from '../services/index';
import "../App.css";

class NavigationBar extends Component {
    logout = () => {
        this.props.logoutUser();
    };

    render() {
        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <Nav className="navbar-right">
                    <Link to={"register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
                    <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
                </Nav>
            </>
        );
        const userLinks = (
            <>
                <Nav className="mr-auto">
                    <Link to={"scheduler"} className="nav-link">Scheduler</Link>
                    <Link to={"calendar"} className="nav-link">Calendar</Link>
                    <Link to={"add"} className="nav-link">Add(Schedule) Class</Link>
                    <Link to={"list"} className="nav-link">Scheduled Classes</Link>
                    <Link to={"analysis"} className="nav-link">Analytics Report</Link>
                </Nav>
                <Nav className="navbar-right">
                    <Link to={"logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                </Nav>
            </>
        );

        return (
            <Navbar className="color-purple" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://i.ibb.co/grpvpLT/171421-antenna-icon.png" width="25" height="25" alt="brand"/> Scheduler Platform
                </Link>
                {/* {this.props.auth.isLoggedIn ? userLinks : guestLinks} */}
                {true ? userLinks : guestLinks}
            </Navbar>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);