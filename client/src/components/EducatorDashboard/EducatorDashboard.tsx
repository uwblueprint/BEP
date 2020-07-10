import * as React from 'react';
import { connect } from "react-redux";
import { fetchEventsService } from "../../data/services/eventsServices"
import { getEvents } from "../../data/selectors/eventsSelector";
import { Event } from "../../data/types/EventTypes";
import EventCard from "./EventCard";
import { Grid } from "@material-ui/core";

const mapStateToProps = (state: any) => ({
    events: getEvents(state.events),
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchEvents: () => dispatch(fetchEventsService())
})


class EducatorDashboard extends React.Component<{ events: Event[]; fetchEvents: any }, {}>{
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchEvents()
    }


    render() {

        const { events } = this.props;

        const obj: Object = {
            events: events
        }

        console.log("hello")
        console.log('component accessible data', obj);
        const test = events.map((event) => (
            <div>
                <div>{event.eventName}</div>
                <div>{event.isActive}</div>
            </div>
        ))
        return (
            <React.Fragment>
                <div>
                    {test}
                    <p>hello</p>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EducatorDashboard);