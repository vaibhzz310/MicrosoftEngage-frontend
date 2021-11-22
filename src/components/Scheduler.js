import React, {Component} from 'react';
import {Card, Table, InputGroup, FormControl, Button,Modal} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "../App.css";
//import MyToast from './MyToast';

export default class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId : 1,
            todayDate : new Date(),
            currentDate : new Date(),
            weekEvents : [],
            showModal : false,
            clickedEventId : null,
            clickedEvent : null
        };
    }

    componentDidMount(){
        this.fetchWeekEvents();
    }

    // componentDidUpdate(prevState){
    //     if(this.state.currentDate!==prevState.currentDate){
    //         this.fetchWeekEvents();
    //         this.composeEventWeekMatrix();
    //     }
    // }

    //helper function to calculate date on previous or next days
    calculateDate=(date,days)=>{
        return new Date(date.getTime()+(days*(24*60*60*1000)));
    }

    fetchWeekEvents = () => {
        //preprocessing the date to get week's events
        let dateParameter=this.state.currentDate;
        if(this.state.currentDate.getDay()!==0){
            dateParameter=this.calculateDate(dateParameter,-this.state.currentDate.getDay());
        }
        console.log(dateParameter);
        //Now using studentId and dateParameter fetch all event information for that student for that week
        // axios.get("http://localhost:8081/rest/event/student?"+this.state.studentId+"date?"+dateParameter)
        // .then(response => response.data)
        // .then((data) => {
        //     this.setState({weekEvents: data});
        // });
        const data=[
            {
                "eventId": 6,
                "eventInfoId": 5,
                "studentId": 1,
                "modeOpted": null,
                "attendence": null,
                "courseCode": "CST103",
                "eventType": "Lecture",
                "eventDate": "2021-11-17",
                "startTime": "11:00:00",
                "endTime": "12:00:00",
                "capacity": 50,
                "onlineClassLink": "https://meet.google.com/uoe-cnxz-tft"
            },
            {
                "eventId": 13,
                "eventInfoId": 12,
                "studentId": 1,
                "modeOpted": null,
                "attendence": null,
                "courseCode": "HST101",
                "eventType": "Lecture",
                "eventDate": "2021-11-17",
                "startTime": "15:00:00",
                "endTime": "16:00:00",
                "capacity": 25,
                "onlineClassLink": "https://meet.google.com/uoe-cnxz-tft"
            }
        ]
        this.setState({weekEvents:data});
    };

    // buildEventWeekMatrix=()=>{
    //     const temp=[];
    //     for(let i=0;i<7;i++){
    //         temp.push([]);
    //         for(let j=0;j<9;j++){
    //             if()
    //             temp[i].push("None");
    //         }
    //     }
    //     eventMatrixWeek=temp;
    // }

    composeEventWeekMatrix=(eventMatrixWeek)=>{
        //write code to transfer events from weekEvents to eventMatrixWeek 
        //this.buildEventWeekMatrix();
        this.state.weekEvents.map((weekEvent)=>{
            let [year,month,day]=weekEvent.eventDate.split("-").map((x)=>parseInt(x));
            let eventDate=new Date(year,month,day);
            const x=eventDate.getDay();
            const y=(weekEvent.startTime.split(":").map((x)=>parseInt(x))[0])-7;
            eventMatrixWeek[x][y]=
                <Button id={weekEvent.eventId} onClick={this.handleShow} className="color-purple">
                    {weekEvent.courseCode}
                </Button>;
        })
        return eventMatrixWeek;
        //console.log(this.state.eventMatrixWeek);
    };

    handleClose=()=>{
        this.setState({showModal : false , clickedEventId : null , clickedEvent : null})
    };

    handleShow=(event)=>{
        alert(event.target.id);
        this.setState({showModal : true , clickedEventId : event.target.id , 
            clickedEvent : this.state.weekEvents
                .find(weekEvent => weekEvent.eventId==event.target.id)
        })
    };

    handleReset=(event)=>{
        event.preventDefault();
        this.handleSaveEvent(null);
        this.handleClose();
    }

    handleChoseOnline=(event)=>{
        event.preventDefault();
        this.handleSaveEvent("Online");
        this.handleClose();
    }

    handleChoseOffline=(event)=>{
        event.preventDefault();
        this.handleSaveEvent("Offline");
        this.handleClose();
    }

    handleSaveEvent = (chosenMode) => {
        //Update opted mode in calendar events
        const updatedEvent = {
            "eventId": this.state.clickedEventId,
            "eventInfoId": this.state.clickedEvent.eventInfoId,
            "studentId": this.state.clickedEvent.studentId,
            "modeOpted": chosenMode,
            "attendence": this.state.clickedEvent.attendence
        };
        axios.put("http://localhost:8081/rest/event", updatedEvent)
            .then(response => {
                if(response.data != null) {
                    //Succesfuly updated event
                    //showToast state variable needs to be added and Toast placed in return()
                    //<MyToast show = {true} message = "Updated Successfully" type = {"success"}/>
                } else {
                    //Failed to update
                    //<MyToast show = {true} message = "Error" type = {"failed"}/>
                }
            });
    };

    render(){
        console.log(this.state.weekEvents);
        let eventMatrixWeek=[
            ["Monday","None","None","None","None","None","None","None","None","None"],
            ["Tuesday","None","None","None","None","None","None","None","None","None"],
            ["Wednesday","None","None","None","None","None","None","None","None","None"],
            ["Thursday","None","None","None","None","None","None","None","None","None"],
            ["Friday","None","None","None","None","None","None","None","None","None"],
            ["Saturday","None","None","None","None","None","None","None","None","None"]
        ]
        console.log(eventMatrixWeek);
        eventMatrixWeek=this.composeEventWeekMatrix(eventMatrixWeek);
        console.log(eventMatrixWeek);
        return(
            <div>
                <div>
                {this.state.showModal?
                <Modal
                    show={this.state.showModal}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.clickedEvent.courseCode}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        This is a {this.state.clickedEvent.eventType} class.<br/>
                        Capacity : {this.state.clickedEvent.capacity}<br/>
                        Opted mode : {this.state.clickedEvent.modeOpted}<br/>
                        Edit your opted mode with the below buttons
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleReset}>Reset</Button>
                        <Button variant="primary" onClick={this.handleChoseOnline}>Online</Button>
                        <Button variant="primary" onClick={this.handleChoseOffline}>Offline</Button>
                    </Modal.Footer>
                </Modal>
                : ""}
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faUsers} /> User List</Card.Header>
                    <Card.Body>
                        <Table  bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>8AM-9AM</td>
                                    <td>9AM-10AM</td>
                                    <td>10AM-11AM</td>
                                    <td>11AM-12PM</td>
                                    <td>12PM-1PM</td>
                                    <td>1PM-2PM</td>
                                    <td>2PM-3PM</td>
                                    <td>3PM-4PM</td>
                                    <td>4PM-5PM</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.weekEvents.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="6">No Classes Scheduled</td>
                                    </tr> :
                                    eventMatrixWeek.map((row,index) => (
                                        <tr align="complete" key={index}>
                                            {/* <td style={{padding:"0px"}}>
                                                <Button 
                                                    
                                                    style={{height:"100%"},{width:"100%"},{display:"block"},{overflow:"auto"}} 
                                                    onClick={()=>{alert("user email is"+user.email)}}>
                                                        {user.email}
                                                </Button>
                                            </td> */}
                                            <td>{row[0]}</td>
                                            <td>{row[1]}</td>
                                            <td>{row[2]}</td>
                                            <td>{row[3]}</td>
                                            <td>{row[4]}</td>
                                            <td>{row[5]}</td>
                                            <td>{row[6]}</td>
                                            <td>{row[7]}</td>
                                            <td>{row[8]}</td>
                                            <td>{row[9]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}