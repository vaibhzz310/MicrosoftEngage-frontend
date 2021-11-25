import React, {Component} from 'react';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';

export default class EventInformationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventsInformation : []
        };
    }

    componentDidMount() {
        this.findAllEventsInformation();
    }

    findAllEventsInformation() {
        axios.get("http://localhost:8081/rest/eventInformation")
            .then(response => response.data)
            .then((data) => {
                this.setState({eventsInformation: data});
            });
    };

    deleteEventInformation = (eventInfoId) => {
        axios.delete("http://localhost:8081/rest/eventInformation/"+eventInfoId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        eventsInformation: this.state.eventsInformation
                            .filter(eventInformation => eventInformation.eventInfoId !== eventInfoId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    };

    render() {
        return (
        <div>
        <div style={{"display":this.state.show ? "block" : "none"}}>
            <MyToast show = {this.state.show} 
                     message = {"Event Information Deleted Successfully."} 
                     type = {"danger"}/>
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header><FontAwesomeIcon icon={faList} /> List of Scheduled Classes</Card.Header>
            <Card.Body>
                <Table bordered hover striped variant="dark">
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Event Type</th>
                            <th>Event Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Capacity</th>
                            <th>Online Class Link</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.eventsInformation.length === 0 ?
                            <tr align="center">
                                <td colSpan="8">No Classes Scheduled</td>
                            </tr> :
                            this.state.eventsInformation.map((eventInformation) => (
                            <tr key={eventInformation.eventInfoId}>
                                <td>{eventInformation.courseCode}</td>
                                <td>{eventInformation.eventType}</td>
                                <td>{eventInformation.eventDate}</td>
                                <td>{eventInformation.startTime}</td>
                                <td>{eventInformation.endTime}</td>
                                <td>{eventInformation.capacity}</td>
                                <td>
                                    <Button 
                                    onClick={()=>{window.open(eventInformation.onlineClassLink)}}
                                    variant="link">
                                        Meet Link
                                    </Button>
                                </td>
                                <td>
                                <ButtonGroup>
                                    <Link   to={"edit/"+eventInformation.eventInfoId} 
                                            className="btn btn-sm btn-outline-primary">
                                                <FontAwesomeIcon icon={faEdit} />
                                    </Link>{' '}
                                    <Button size="sm" variant="outline-danger" 
                                            onClick={this.deleteEventInformation.bind(this, eventInformation.eventInfoId)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </ButtonGroup>
                                </td>
                            </tr>
                            ))
                        }
                        </tbody>
                </Table>
            </Card.Body>
        </Card>
        </div>
        );
    }
}