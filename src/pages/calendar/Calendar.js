import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./Calendar.css"
import {ResourceGroups} from "./ResourceGroups";

class Calendar extends Component {

  constructor(props) {
    super(props);

    this.calendarRef = React.createRef();
    this.datePickerRef = React.createRef();

    this.state = {
      viewType: "Resources",
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        this.calendar.clearSelection();
        if (!modal.result) { return; }
        this.calendar.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          resource: args.resource,
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        this.calendar.events.update(e);
      },
      onHeaderClick: async args => {
        const modal = await DayPilot.Modal.prompt("Resource name:", args.column.name);
        if (!modal.result) { return; }
        args.column.data.name = modal.result;
        this.calendar.update();
      }
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  get datePicker() {
    return this.datePickerRef.current.control;
  }

  componentDidMount() {
    this.datePicker.select("2022-11-07");
  }

  loadGroups() {
      const data = [
        { name: "Locations", id: "locations", resources: [
            {name: "Room 1", id: "R1"},
            {name: "Room 2", id: "R2"},
            {name: "Room 3", id: "R3"},
            {name: "Room 4", id: "R4"},
            {name: "Room 5", id: "R5"},
            {name: "Room 6", id: "R6"},
            {name: "Room 7", id: "R7"},
            {name: "Room 7", id: "R8"},
          ]
        },
        { name: "People", id: "people", resources: [
            {name: "Person 1", id: "P1"},
            {name: "Person 2", id: "P2"},
            {name: "Person 3", id: "P3"},
            {name: "Person 4", id: "P4"},
            {name: "Person 5", id: "P5"},
            {name: "Person 6", id: "P6"},
            {name: "Person 7", id: "P7"},
          ]
        },
        { name: "Tools", id: "tools", resources: [
            {name: "Tool 1", id: "T1"},
            {name: "Tool 2", id: "T2"},
            {name: "Tool 3", id: "T3"},
            {name: "Tool 4", id: "T4"},
            {name: "Tool 5", id: "T5"},
            {name: "Tool 6", id: "T6"},
            {name: "Tool 7", id: "T7"},
          ]
        },
      ];
      return data;
  }

  groupChanged(group) {

    const columns = group.resources;

    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2022-11-07T10:30:00",
        end: "2022-11-07T13:00:00",
        barColor: "#fcb711",
        resource: "R1"
      },
      {
        id: 2,
        text: "Event 2",
        start: "2022-11-07T09:30:00",
        end: "2022-11-07T11:30:00",
        barColor: "#f37021",
        resource: "R2"
      },
      {
        id: 3,
        text: "Event 3",
        start: "2022-11-07T12:00:00",
        end: "2022-11-07T15:00:00",
        barColor: "#cc004c",
        resource: "R2"
      },
      {
        id: 4,
        text: "Event 4",
        start: "2022-11-07T11:30:00",
        end: "2022-11-07T14:30:00",
        barColor: "#6460aa",
        resource: "R3"
      },
      {
        id: 5,
        text: "Event 5",
        start: "2022-11-07T10:00:00",
        end: "2022-11-07T13:30:00",
        resource: "P2"
      },
      {
        id: 6,
        text: "Event 6",
        start: "2022-11-07T12:30:00",
        end: "2022-11-07T15:30:00",
        barColor: "#f1c232",
        resource: "T3"
      },
    ];

    this.calendar.update({columns, events});

  }

  next() {
    const current = this.datePicker.selectionDay;
    const updated = current.addDays(1);
    this.datePicker.select(updated);
  }

  previous() {
    const current = this.datePicker.selectionDay;
    const updated = current.addDays(-1);
    this.datePicker.select(updated);
  }

  render() {

    return (
      <div className={"wrap"}>
        <div className={"left"}>
          <DayPilotNavigator
            selectMode={"Day"}
            showMonths={1}
            skipMonths={1}
            onTimeRangeSelected={ args => {
              this.calendar.update({
                startDate: args.day
              });
            }}
            ref={this.datePickerRef}
          />
        </div>
        <div className={"calendar"}>

          <div className={"toolbar"}>
            <ResourceGroups onChange={args => this.groupChanged(args.selected)} items={this.loadGroups()}></ResourceGroups>
            <span>Day:</span>
            <button onClick={ev => this.previous()}>Previous</button>
            <button onClick={ev => this.next()}>Next</button>
          </div>

          <DayPilotCalendar
            {...this.state}
            ref={this.calendarRef}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
