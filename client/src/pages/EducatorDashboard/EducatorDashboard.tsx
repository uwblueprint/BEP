import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { Event } from "../../data/types/EventTypes"
import { connect } from "react-redux";
import { fetchEventsService } from "../../data/services/eventsServices"
import {changeFilter} from "../../data/actions/eventsActions"
import { getFilteredEvents } from "../../data/selectors/eventsSelector";
import Typography from "@material-ui/core/Typography";
import Button from "../../components/Button"
import EventCard from "./EventCard"
import { AnyARecord } from 'dns';


type EventProps = {
    eventsFilter: any
}
  
  interface StateProps {
    events: Event[],
  }
       
  interface DispatchProps {
    fetchEvents: any,
    changeFilter: any
  }
   
  type Props = StateProps & DispatchProps & EventProps

const mapStateToProps = (state: any) : StateProps=> ({
    events: getFilteredEvents(state.events),
})

const mapDispatchToProps = (dispatch: any):DispatchProps => ({
    fetchEvents: (limit: number, offset: number) => dispatch(fetchEventsService(limit, offset)),
    changeFilter: (filter: string) => dispatch(changeFilter(filter))
})

const EducatorDashboard: React.SFC<Props> = ({ events, fetchEvents, changeFilter }: Props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isEventActive, setisEventActive] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const tests = events

    useEffect(() => {
        console.log(startDate)
        console.log(endDate)
        fetchEvents(5,0)

    }, [startDate]);

    // console.log(this.props.active)
    return (
        <React.Fragment>
            <Typography variant="h3" component="h2">Your Opportunities</Typography>
            <div>
                <Button onClick={() => changeFilter("ACTIVE")}>Current</Button>
                <Button onClick={() => changeFilter("PAST")}>Past</Button>


                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: any) => setStartDate(date)}
                        placeholderText='Start Date'
                        startDate={startDate}
                        endDate={endDate}

                    />
                </div>
                <div>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: any) => setEndDate(date)}
                        placeholderText='End Date'
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}


                    />
                </div>

                {/* {isEventActive ? tests.map((event, index) => (<EventCard key={index} event={event} active={isEventActive} />)) :
                    tests.map((event, index) => (<PastEventCard key={index} event={event} active={isEventActive} />))}
                {isLoading ? tests.map((event, index) => (
                    <EventCard key={index} event={event} active={isEventActive} />
                )) : <div>Loading</div>}
                {console.log(isLoading)} */}

                {tests.filter(events => (events.startDate < events.endDate)).map((event, index) => (
                    <div>
                        <EventCard key={index} event={event} active={isEventActive} />
                    </div>

                ))}

            </div>
        </React.Fragment>
    )

}


  


export default connect<StateProps, DispatchProps, EventProps>(mapStateToProps, mapDispatchToProps)(EducatorDashboard);

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