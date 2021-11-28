import React,{useState} from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentTooltip,
  MonthView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton
} from "@devexpress/dx-react-scheduler-material-ui";
import { purple } from "@material-ui/core/colors";

const schedulerData = [
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:00",
    title: "Meeting"
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym bar"
  }
];

const Appointment = ({
    children, style, ...restProps
  }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: '#32cd32',
        borderRadius: '8px',
      }}
    >
      {children}
    </Appointments.Appointment>
);

const Calendar = () => {
    const [currentDate,setCurrentDate]=useState("2018-11-01")
    const currentDateChange=(currDate)=>{
        setCurrentDate(currDate);
    }
    const a=10;
    return(
        <Paper>
            <Scheduler data={schedulerData} >
                <ViewState 
                    currentDate={currentDate} 
                    onCurrentDateChange={currentDateChange}
                />
                <DayView startDayHour={8} endDayHour={18} />
                <WeekView startDayHour={8} endDayHour={18} />
                <MonthView />
                <Appointments appointmentComponent={Appointment} />
                <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                <TodayButton />
            </Scheduler>
        </Paper>
    )
};

export default Calendar;
