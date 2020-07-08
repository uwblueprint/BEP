import * as React from 'react';
import { connect } from "react-redux";
import { fetchEventsService } from "../../data/services/eventsServices"

import { getEvents } from "../../data/selectors/eventsSelector";

import { Event } from "../../data/types/EventTypes";

import EventCard from "./EventCard";
import { Grid } from "@material-ui/core";



class EducatorDashboard extends React.Component<{ events: Event[]; fetchEvents: any }, {}>{

    render() {
        const createEventCard = (event: Event) => (
            <Grid item xs={12}>
                <EventCard {...event} />
            </Grid>
        );

        return (
            <Grid container direction="row">
                <Grid item sm={1} />
                <Grid item container xs={12} sm={10} spacing={2}>
                    {this.props.events.map((event) =>
                        createEventCard(event)
                    )}
                </Grid>
                <p>Educator Dashboard</p>
            </Grid>
        );
    }
}

const mapStateToProps = (state: any) => ({
    events: getEvents(state.events),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchEvents: (limit: number, offset: number) =>
        dispatch(fetchEventsService(limit, offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EducatorDashboard);