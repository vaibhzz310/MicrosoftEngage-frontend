import React,{Component} from 'react';
import { Card ,Row,Col,Dropdown,DropdownButton} from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from 'axios';
Chart.register(...registerables);

export default class Analytics extends Component{
    constructor(props) {
        super(props);
        this.state = {
            course: "",
            event_infos:[],
            events:[],
        };
    }

    componentDidMount() {
        this.findEventInformationByCourse(this.state.course);
        console.log(1);
        this.findEvents();
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.course!==prevState.course){
            this.findEventInformationByCourse(this.state.course);
        }
    }

    findEventInformationByCourse = (course) => {
        //events for course filtered on client side....move it to the backend part
        axios.get("http://localhost:8081/rest/eventInformation")
            .then(response => {
                if(response.data != null) {
                    let event_infos_t=response.data;
                    event_infos_t=event_infos_t.filter(event_info=>event_info.courseCode===course);
                    this.setState({event_infos:event_infos_t});
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    findEvents=()=>{
        axios.get("http://localhost:8081/rest/event")
            .then(response => {
                if(response.data != null) {
                    this.setState({events:response.data});
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    }

    getDataMetrics=()=>{
        const event_infos_t=this.state.event_infos;
        const data_metrics_t=[];
        event_infos_t.forEach((event_info)=>{
            let offline=0;
            let online=0;
            let none =0;
            const events_t=this.state.events.filter(event => event.eventInfoId===event_info.eventInfoId);
            events_t.forEach(event_t=>{
                if(event_t.modeOpted==="Offline"){offline=offline+1;}
                else if(event_t.modeOpted==="Online"){online=online+1;}
                else{none=none+1;}
            })
            data_metrics_t.push({offline:offline,online:online,none:none});
        })
        return data_metrics_t;
        //this.setState({data_metrics:data_metrics_t});
    }

    render(){
        //data metrics has each element as [offline,online,none]
        const data_metrics=this.getDataMetrics();
        console.log(this.state.event_infos);
        console.log(this.state.events);
        console.log(data_metrics);
        const average_offline=(data_metrics.reduce(
            (accumulator, current) => accumulator + current.offline, 0))/this.state.event_infos.length;
        //data arrays for displaying line chart
        //labels
        const labels=this.state.event_infos.map((event_info)=>event_info.eventDate);
        const offline=data_metrics.map(data_metric=>data_metric.offline);
        const online=data_metrics.map(data_metric=>data_metric.online);
        const total_strength=data_metrics.map(data_metric=>
                                    (data_metric.offline+data_metric.online+data_metric.none));
        // console.log(labels);
        // console.log(offline);
        // console.log(online);
        console.log(total_strength);
        const dataLine={
            labels:labels,
            datasets:[
                {
                    label: "Students attending Offline",
                    data: offline,
                    fill: false,
                    backgroundColor: "rgba(225, 204,230, .3)",
                    borderColor: "rgb(205, 130, 158)",
                    lineTension: 0.3,
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,158)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                },
                {
                    label: "Students attending Online",
                    data: online,
                    fill: false,
                    backgroundColor: "rgba(6, 156,51, .3)",
                    borderColor: "#02b844",
                    lineTension: 0.3,
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "#02b844",
                    pointBackgroundColor: "rgba(6, 156,51, .3)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10
                    
                },
                {
                    label: "Total Students having class",
                    data: total_strength,
                    fill: false,
                    backgroundColor: "rgba(184, 185, 210, .3)",
                    borderColor: "rgb(35, 26, 136)",
                    lineTension: 0.3,
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(35, 26, 136)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10
                }
            ]
        }
        const course_list=["Algorithms","Maths","Economics","Sociology","English","Wireless","Neural Networks"];
        return(
            <Card >
                <Card.Header >
                    <Row>
                    <Col>
                        <h2>Report for {this.state.course}</h2>
                    </Col>
                    <Col>
                        <DropdownButton variant="dark" id="selectCourse" title="Select Course" style={{textAlign:"right"}} >
                            {course_list.map((course)=>{
                                return <Dropdown.Item onSelect={()=>{this.setState({course:course})}}>{course}</Dropdown.Item>
                            })}
                        </DropdownButton>
                    </Col>
                    </Row>
                </Card.Header>
                <Card.Body>

                    <MDBContainer>
                        <Line data={dataLine}  options={{ responsive: true }} size="sm" />
                    </MDBContainer>

                    {/* <h3>No. of students opted for this Course:</h3> */}
                    <br/><br/><h4>Total classes scheduled till date = {this.state.event_infos.length}</h4><br/>
                    <h4>Average number of students opting for Offline = {average_offline}</h4><br/>

                </Card.Body>
                <Card.Footer>
                    Divider
                </Card.Footer>
            </Card>
        );
    }
}