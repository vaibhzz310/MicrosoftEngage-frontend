import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Scheduler from './components/Scheduler';
import Footer from './components/Footer';
//import Calendar from "./components/Calendar";

export default function App() {
  const marginTop = {
    marginTop:"20px"
  };

  const heading = "Welcome to Book Shop";
  const quote = "Good friends, good books, and a sleepy conscience: this is the ideal life.";
  const footer = "Mark Twain";

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
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}
