import * as React from 'react';
import { connect } from "react-redux";
import { fetchEventsService } from "../../data/services/eventsServices"
import { getEvents } from "../../data/selectors/eventsSelector";
import { Event } from "../../data/types/EventTypes";
import EventCard from "./EventCard";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Button from "../Button"


const styles = {
    root: {
        flexGrow: 1,
        minWidth: 275,
        padding: 3,
        background: "#E5E5E5"
    },
    card: {
        maxWidth: 800,
        margin: `1px auto`,
        padding: 2
    }
};

const mapStateToProps = (state: any) => ({
    events: getEvents(state.events),
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchEvents: () => dispatch(fetchEventsService())
})

interface IState {
    isEventActive?: boolean;
    noData?: boolean;
}


class EducatorDashboard extends React.Component<{ events: Event[]; fetchEvents: any; classes: object }, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            isEventActive: true,
            noData: true
        }
    }

    componentDidMount() {
        this.props.fetchEvents()
    }

    fetchPastEvents = () => {
        this.setState({
            isEventActive: false
        })
    }

    fetchActiveEvents = () => {
        this.setState({
            isEventActive: true
        })
    }

    render() {
        const { events } = this.props;


        // var test = events.filter(event => event.isActive == true).map((event) => (
        //     activeEvents == true
        // ))

        var displayEvents = events.filter(event => event.isActive == this.state.isEventActive).map((event) => (
            <EventCard event={event} />
        ))


        // : <p>You do not currently have any listed opportunities.
        // Create a new opportunity to get started!</p>}


        return (
            <React.Fragment>
                <Typography variant="h3" component="h2">Your Opportunities</Typography>
                <div>
                    <Button onClick={this.fetchActiveEvents}>Current</Button>
                    <Button onClick={this.fetchPastEvents}>Past</Button>
                </div>
                <div>
                    {displayEvents}
                </div>

            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EducatorDashboard));