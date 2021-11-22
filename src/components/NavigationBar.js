import React from 'react';
import "../App.css";

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavigationBar() {
    return (
        <Navbar className="color-purple" variant="dark">
            <Link to={""} className="navbar-brand">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png" width="25" height="25" alt="brand"/> Book Shop
            </Link>
            <Nav className="mr-auto">
                <Link to={"scheduler"} className="nav-link">Scheduler</Link>
                <Link to={"calendar"} className="nav-link">Calendar</Link>
            </Nav>
        </Navbar>
    );
}