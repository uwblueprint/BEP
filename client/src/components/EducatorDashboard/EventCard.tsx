import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { Event } from "../../data/types/EventTypes"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 275,
        padding: theme.spacing(0, 3),
    },
    card: {
        maxWidth: 800,
        margin: `${theme.spacing(7)}px auto`,
        padding: theme.spacing(3),
        borderRadius: 10
    },

}));

export default function EventCard(props: any) {
    console.log(props);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h2">
                                {props.event.eventName}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <p>Event Type</p>
                            <Typography variant="body1" component="h2">
                                {props.event.eventType}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <p>Start Date of Event</p>
                            <Typography variant="body1" component="h2">
                                {props.event.startDate}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <p>Format</p>
                            <Typography variant="body1" component="h2">
                                {props.event.eventType}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <p>Requested Number Speakers</p>
                            <Typography variant="body1" component="h2">
                                <p>{props.event.applicationsReceived}</p>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <p>End Date of Event</p>
                            <Typography variant="body1" component="h2">
                                {props.event.endDate}
                            </Typography>
                        </Grid>

                    </Grid>
                </CardContent>
                <CardContent>
                    <Grid container spacing={0}>
                        <Grid item xs={7} />
                        <Grid item xs={3}>
                            <Typography variant="body1" component="h2">
                                <p>{props.event.applicationsReceived} Applications</p>
                            </Typography>
                        </Grid><Grid item xs={2}>
                            <Typography variant="body1" component="h2">
                                <p>{props.event.invitationsSent} Invitations Sent</p>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>


            </Card>
        </div >


    );
}