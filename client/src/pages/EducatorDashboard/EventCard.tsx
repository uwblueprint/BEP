import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        margin: `${theme.spacing(7)}px auto`,
        padding: theme.spacing(3),
        borderRadius: 5
    },
    tag: {
        padding: '0px 3px',
        margin: '2px',
        textAlign: 'center',
        borderRadius: 10,
        background: '#F7FAFC'
    },
    textHighlight: {
        paddingLeft: '1em',
        color: '#0A79BF',
        fontWeight: 700
    }

}));

function getDate(props: any) {

    var eventStartDate = new Date(props.event.startDate).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '')
    var eventEndDate = new Date(props.event.endDate).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '')

    if (eventStartDate === eventEndDate) {
        var date = eventStartDate
    } else {
        var date = `${eventStartDate} to ${eventEndDate}`
    }

    return date
}

export default function EventCard(props: any) {
    console.log(props);
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                {props.event.eventName}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                Event Type
                            </Typography>
                            <Typography variant="body1" >
                                {props.event.activityType}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" >
                                Preferred Sector
                            </Typography>
                            <Typography variant="body1" >
                                {props.event.preferredSector}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" >
                                Date(s) of Event
                            </Typography>
                            <Typography variant="body1" >
                                {getDate(props)}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                Grades of participating students
                            </Typography>
                            <Typography variant="body1">
                                {props.event.gradeOfStudents}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                Hours of Commitment
                            </Typography>
                            <Typography variant="body1">
                                {props.event.hoursCommitment}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                Number of Students
                            </Typography>
                            <Typography variant="body1">
                                {props.event.numberOfStudents}
                            </Typography>
                        </Grid>

                    </Grid>
                </CardContent>

                {props.event.isActive ?
                    <CardContent>
                        <Grid container spacing={0}>
                            <Grid item xs={3}>
                                <Typography variant="subtitle2" className={classes.tag} >
                                    Posting expires on {(new Date(props.event.postingExpiry)).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '')}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle2" className={classes.tag}>
                                    Applications Received <span className={classes.textHighlight}>{props.event.applicantNumber}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="subtitle2" className={classes.tag}>
                                    Invitations Sent <span className={classes.textHighlight}>{props.event.invitationNumber}</span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    : null
                }



            </Card>
        </div >


    );
}