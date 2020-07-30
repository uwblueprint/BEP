import React, { useEffect, useState } from 'react';
import { Event } from "../../data/types/EventTypes"
import { connect } from "react-redux";
import { fetchEventsService } from "../../data/services/eventsServices"
import { changeFilter } from "../../data/actions/eventsActions"
import { getFilteredEvents } from "../../data/selectors/eventsSelector";
import Typography from "@material-ui/core/Typography";
import Button from "../../components/Button"
import EventCard from "./EventCard"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

const mapStateToProps = (state: any): StateProps => ({
    events: getFilteredEvents(state.events),
})

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    fetchEvents: (limit: number, offset: number) => dispatch(fetchEventsService(limit, offset)),
    changeFilter: (filter: string) => dispatch(changeFilter(filter))
})

const EducatorDashboard: React.SFC<Props> = ({ events, fetchEvents, changeFilter }: Props) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isEventActive, setisEventActive] = useState(true);
    const [page, setPage] = useState<number>(0);
    const [prevY, setPrevY] = useState<number>(0);
    const [lastEventListLength, setLastEventListLength] = useState<number>(0);
    const [loadedAllEvents, setLoadedAllEvents] = useState<boolean>();
    const [offset, setOffset] = useState<number>(10);

    const tests = events

    useEffect(() => {
        console.log(startDate)
        fetchEvents(5, 0)

    }, [startDate]);

    const handleObserver = (entities: any, observer: IntersectionObserver) => {
        const y = entities[0].boundingClientRect.y;
        const newPage = page + 1;
        if (prevY > y) {
            if (lastEventListLength === events.length) {
                // If no new volunteers are available, prevent additional calls to backend.
                setLoadedAllEvents(true);
            }

            if (!loadedAllEvents) {
                if (events.length > 1)
                    setLastEventListLength(events.length);

                fetchEvents(offset, newPage * offset);
                setPage(newPage);
            }
        }
        setPrevY(y);
    }

    return (
        <React.Fragment>
            <Typography variant="h3" component="h2">Your Opportunities</Typography>
            <div>
                <Button onClick={() => changeFilter("ACTIVE")}>Current</Button>
                <Button onClick={() => changeFilter("PAST")}>Past</Button>
            </div>
            <div>


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        placeholder="Start date"
                        value={startDate}
                        onChange={date => setStartDate(date)}
                        format="yyyy/MM/dd"
                    />
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        placeholder="End date"
                        value={endDate}
                        onChange={date => setEndDate(date)}
                        format="yyyy/MM/dd"
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div>

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

        </React.Fragment >
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