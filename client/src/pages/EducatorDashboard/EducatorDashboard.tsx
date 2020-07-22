import React, { useEffect, useState } from 'react';
import { Event } from "../../data/types/EventTypes"
import { connect } from "react-redux";
import { fetchEventsService } from "../../data/services/eventsServices"
import { getEvents } from "../../data/selectors/eventsSelector";
import Typography from "@material-ui/core/Typography";
import Button from "../../components/Button"
import EventCard from "./EventCard"

const mapStateToProps = (state: any) => ({
    events: getEvents(state.events),
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchEvents: (isActive: boolean, limit: number, offset: number) => dispatch(fetchEventsService(isActive, limit, offset))
})

type EventProps = {
    fetchEvents: any
    events: Event[]
}

const EducatorDashboard = ({ events, fetchEvents }: EventProps) => {
    const [isActive, setIsActive] = useState(true)
    const tests = events

    useEffect(() => {
        console.log(isActive)
        fetchEvents(isActive, 2, 0)
    }, [isActive]);

    // console.log(this.props.active)
    return (
        <React.Fragment>
            <Typography variant="h3" component="h2">Your Opportunities</Typography>
            <div>
                <Button onClick={() => setIsActive(true)}>Current</Button>
                <Button onClick={() => setIsActive(false)}>Past</Button>
                {tests.map((event, index) => (
                    <EventCard key={index} event={event} active={isActive} />
                ))}

                {console.log('hello')}
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(EducatorDashboard);

        // var displayEvents = events.map((event, index) => (
        //     <EventCard key={index} event={event} />
// import * as React from 'react';

// import DisplayEvents from "./DisplayEvents"
// import Typography from "@material-ui/core/Typography";
// import Button from "../../components/Button"


// interface IState {
//     isEventActive?: boolean;
// }


// class EducatorDashboard extends React.Component<{}, IState>{
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             isEventActive: true
//         }
//     }


//     fetchActiveEvents = () => {
//         this.setState({
//             isEventActive: true
//         })
//     }

//     fetchPastEvents = () => {
//         this.setState({
//             isEventActive: false
//         })
//     }

//     render() {
//         console.log("rendering Educator Dashboard")


//         return (
//             <React.Fragment>
//                 <Typography variant="h3" component="h2">Your Opportunities</Typography>
//                 <div>
//                     <Button onClick={this.fetchActiveEvents}>Current</Button>
//                     <Button onClick={this.fetchPastEvents}>Past</Button>
//                 </div>
//                 <div>
//                     <DisplayEvents active={this.state.isEventActive} />
//                 </div>
//             </React.Fragment>
//         );
//     }
// }

// export default EducatorDashboard;