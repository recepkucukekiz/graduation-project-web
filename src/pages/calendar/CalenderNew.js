import React, {Component} from 'react';
import { useParams } from 'react-router-dom';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
// import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class Calendar extends Component {


  constructor(props) {
    const userId  = props.userId;
    console.log(userId);
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "WorkWeek",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
    //   onTimeRangeSelected: async args => {
    //     const dp = this.calendar;
    //     const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
    //     dp.clearSelection();
    //     if (!modal.result) { return; }
    //     dp.events.add({
    //       start: args.start,
    //       end: args.end,
    //       id: DayPilot.guid(),
    //       text: modal.result
    //     });
    //   },
    //   eventDeleteHandling: "Update",
    //   onEventClick: async args => {
    //     const dp = this.calendar;
    //     const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
    //     if (!modal.result) { return; }
    //     const e = args.e;
    //     e.data.text = modal.result;
    //     dp.events.update(e);
    //   },
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {

    const events = [
      {
        id: 1,
        text: "Veli Kınık - Sakal",
        start: "2023-03-07T10:30:00",
        end: "2023-03-07T11:00:00"
      },
      {
        id: 2,
        text: "Muhammet İnce - Saç",
        start: "2023-03-08T09:30:00",
        end: "2023-03-08T10:30:00",
        backColor: "#6aa84f"
      },
      {
        id: 3,
        text: "Mehmet Yılmaz - Sakal",
        start: "2023-03-08T13:00:00",
        end: "2023-03-08T14:00:00",
        backColor: "#f1c232"
      },
      {
        id: 4,
        text: "Yiğit Özdemir - Saç",
        start: "2023-03-06T11:30:00",
        end: "2023-03-06T12:00:00",
        backColor: "#cc4125"
      },
    ];

    const startDate = "2023-03-07";

    this.calendar.update({startDate, events});

  }

  render() {
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={1}
            skipMonths={1}
            startDate={"2023-03-07"}
            selectionDay={"2023-03-07"}
            onTimeRangeSelected={ args => {
              this.calendar.update({
                startDate: args.day
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            {...this.state}
            ref={this.calendarRef}
          />
        </div>
      </div>
    );
  }
}

function CalendarNew() {

    const { id } = useParams();

    return (
        <div>
            <Calendar userId={id} />
        </div>
    );
}

export default CalendarNew;
