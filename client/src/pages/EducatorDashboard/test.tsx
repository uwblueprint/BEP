import React from 'react';
import { Event } from "../../data/types/EventTypes"
import { connect } from "react-redux";
import { fetchEventsService } from "../../data/services/eventsServices"
import { getEvents } from "../../data/selectors/eventsSelector";
import EventCard from "./EventCard"

const mapStateToProps = (state: any) => ({
    events: getEvents(state.events),
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchEvents: (isActive: boolean, limit: number, offset: number) => dispatch(fetchEventsService(isActive, limit, offset))
})

class DisplayEvents extends React.Component<{ active: any; events: Event[]; fetchEvents: any; }>{

    componentDidMount() {
        console.log("component did mount")
        // this.props.fetchEvents(this.props.active, 2, 0)
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        console.log("component did update")

        const tests = this.props.events

        console.log("state:" + this.props.active)
        console.log("PrevState:" + prevProps.active)

        if (prevProps.active !== this.props.active) {
            // this.props.fetchEvents(this.props.active, 2, 0)
        }
    }

    // displayCards = () => {

    //     console.log(this.props.active)
    //     const tests = this.props.events

    //     if (this.props.active) {

    //         var currentEvents =
    //             tests.map((event, index) => (
    //                 <ActiveEventCard key={index} event={event} />
    //             ))
    //         return currentEvents
    //     } else {
    //         var pastEvents =
    //             tests.map((event, index) => (
    //                 <PastEventCard key={index} event={event} />
    //             ))
    //         return pastEvents
    //     }

    // }

    render() {

        console.log("rendering display events")

        const tests = this.props.events


        // console.log(this.props.active)
        return (
            <div>
                {tests.map((event, index) => (
                    <EventCard key={index} event={event} active={this.props.active} />
                ))}
            </div >
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEvents);

        // var displayEvents = events.map((event, index) => (
        //     <EventCard key={index} event={event} />