import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Scheduler from './components/Scheduler';
import Footer from './components/Footer';
//import Calendar from "./components/Calendar";
import Register from './components/Register';
import Login from './components/Login';
import EventInformation from './components/EventInformation';
import EventInformationList from './components/EventInformationList';
import Analytics from './components/Analytics';

export default function App() {
  const marginTop = {
    marginTop:"20px"
  };

  const heading = "Welcome to the Scheduler Application";
  const quote = "You can view your time-table for any week and choose to attend a class online or offline";
  const footer = "Have a nice day :)";

  return (
    <Router>
        <NavigationBar/>
        <Container >
            <Row>
                <Col lg={12} style={marginTop}>
                    <Switch>
                        <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                        <Route path="/scheduler" exact component={Scheduler}/>
                        {/* <Route path="/calendar" exact component={Calendar}/> */}
                        <Route path="/add" exact component={EventInformation}/>
                        <Route path="/edit/:eventInfoId" exact component={EventInformation}/>
                        <Route path="/list" exact component={EventInformationList}/>
                        <Route path="/analysis" exact component={Analytics}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/logout" exact component={Login}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}
