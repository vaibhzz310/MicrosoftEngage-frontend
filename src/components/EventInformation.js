import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class EventInformation extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.eventInformationChange = this.eventInformationChange.bind(this);
        this.submitEventInformation = this.submitEventInformation.bind(this);
    }

    initialState = {
        eventInfoId:'', courseCode:'', eventType:'', eventDate:'', 
        startTime:'', endTime:'', capacity:'' , onlineClassLink:''
    };

    componentDidMount() {
        const eventInformationId = +this.props.match.params.eventInfoId;
        console.log(eventInformationId);
        if(eventInformationId) {
            this.findEventInformationById(eventInformationId);
        }
    }

    findEventInformationById = (eventInformationId) => {
        axios.get("http://localhost:8081/rest/eventInformation/"+eventInformationId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        eventInfoId:response.data.eventInfoId, 
                        courseCode:response.data.courseCode, 
                        eventType:response.data.eventType, 
                        eventDate:response.data.eventDate, 
                        startTime:response.data.startTime, 
                        endTime:response.data.endTime, 
                        capacity:response.data.capacity, 
                        onlineClassLink:response.data.onlineClassLink
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    resetEventInformation = () => {
        this.setState(() => this.initialState);
    };

    // convertTime12to24 = (time12h) => {
    //     const [time, modifier] = time12h.split(' ');
    //     let [hours, minutes] = time.split(':');
    //     if (hours === '12') {
    //       hours = '00';
    //     }
    //     if (modifier === 'PM') {
    //       hours = parseInt(hours, 10) + 12;
    //     }
    //     return `${hours}:${minutes}:00`;
    // }

    // convertDate = (date)=>{
    //     let [day,month,year]=date.split('-');
    //     return year+"-"+month+"-"+day;
    // }

    submitEventInformation = event => {
        event.preventDefault();

        const startTime_t=this.state.startTime+":00";
        const endTime_t=this.state.endTime+":00";

        const eventInformation = {
            courseCode:this.state.courseCode, 
            eventType:this.state.eventType, 
            eventDate:this.state.eventDate, 
            startTime:startTime_t, 
            endTime:endTime_t, 
            capacity:this.state.capacity, 
            onlineClassLink:this.state.onlineClassLink
        };

        console.log("saving");
        console.log(eventInformation);

        axios.post("http://localhost:8081/rest/eventInformation", eventInformation)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    updateEventInformation = event => {
        event.preventDefault();

        //Because loading state values from database,so the time value already have that seconds value
        // const startTime_t=this.state.startTime+":00";
        // const endTime_t=this.state.endTime+":00";

        const eventInformation = {
            eventInfoId:this.state.eventInfoId,
            courseCode:this.state.courseCode, 
            eventType:this.state.eventType, 
            eventDate:this.state.eventDate, 
            startTime:this.state.startTime, 
            endTime:this.state.endTime, 
            capacity:this.state.capacity, 
            onlineClassLink:this.state.onlineClassLink
        };

        console.log("updating");
        console.log(eventInformation);

        axios.put("http://localhost:8081/rest/eventInformation", eventInformation)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.eventInformationList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    eventInformationChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    eventInformationList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {courseCode, eventType, eventDate,startTime, 
            endTime, capacity, onlineClassLink} = this.state;

        return (
        <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} 
                    message = {this.state.method === "put" 
                        ? "Event Information Updated Successfully." 
                        : "Event Information Saved Successfully."} 
                    type = {"success"}/>
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon 
                        icon={this.state.eventInfoId ? faEdit : faPlusSquare} 
                    /> {this.state.eventInfoId ? "Update Event Information" : "Add New Event Information"}
                </Card.Header>
                <Form   onReset={this.resetEventInformation} 
                        onSubmit={this.state.eventInfoId 
                            ? this.updateEventInformation 
                            : this.submitEventInformation} 
                        id="eventInformationFormId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="courseCode">
                                <Form.Label>Course Code</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="courseCode"
                                    value={courseCode} onChange={this.eventInformationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter the Course Code " />
                            </Form.Group>
                            <Form.Group as={Col} controlId="eventType">
                                <Form.Label>Event Type</Form.Label>
                                {/* <Form.Control required autoComplete="off"
                                    type="select" name="eventType"
                                    value={eventType} onChange={this.eventInformationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="eg: Lecture , Tutorial" /> */}
                                <Form.Control required autoComplete="off"
                                    as="select" name="eventType"
                                    value={eventType} onChange={this.eventInformationChange}
                                    className={"bg-dark text-white"}>
                                        <option value="Lecture">Lecture</option>
                                        <option value="Tutorial">Tutorial</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="eventDate">
                                <Form.Label>Event Date</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="date" name="eventDate"
                                    value={eventDate} onChange={this.eventInformationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Date" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="startTime">
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="time" name="startTime"
                                    value={startTime} onChange={this.eventInformationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="endTime">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="time" name="endTime"
                                    value={endTime} onChange={this.eventInformationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="capacity">
                                <Form.Label>Capacity</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="capacity"
                                    value={capacity} onChange={this.eventInformationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="onlineClassLink">
                                <Form.Label>Online Class Link</Form.Label>
                                <Form.Control autoComplete="off"
                                    type="test" name="onlineClassLink"
                                    value={onlineClassLink} onChange={this.eventInformationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Meeting Link will be generated automatically
                                     and sent to you by mail" />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> 
                            {this.state.eventInfoId ? "Update" : "Save"}
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                        </Button>{' '}
                        <Button size="sm" variant="info" type="button" 
                                onClick={this.eventInformationList.bind()}>
                            <FontAwesomeIcon icon={faList} /> Events List
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
        );
    }
}