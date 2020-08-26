import React, { useEffect } from 'react'
import { OutlinedTextField, TextField } from '../../components/TextField'
import {PageHeader, PageBody} from '../../components/Page'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {Link} from 'react-router-dom'



type OpFormProps = {
    name: string;
    requiredVolunteers: string;
    activityType: string;
    preferredSector: string
    singleDayEvent: boolean;
    startDateAndTime: Date;
    endDateAndTime: Date;
    numberOfHours?: number;
    transportation: string;
    numberOfStudents: string;
    studentGrades: string[];
    public: boolean;
}

const OpportunityForm = (props?: OpFormProps) => {
    // const [singleDayEvent, setSingleDayEvent] = React.useState(props?.singleDayEvent !== undefined ? props.singleDayEvent : true)
    //Mock for testing:
    const [singleDayEvent, setSingleDayEvent] = React.useState(false)


    return (
        <div style={{ height: "100vh" }}>
            <Grid container style={{ height: "100%" }}>
                <PageHeader>
                <Grid
                        item
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-end"
                        style={{ height: "100%", width: "100%" }}
                    >
                          <Grid item direction="column" style={{marginBottom: '10%'}}>
                            <Typography variant="body1">
                            <Link to="/events" style={{textDecoration: "none"}}>{`<`} Back </Link>
                            </Typography>
                            <Typography variant="h1" style={{ marginTop: "0%" }}>
                                Create New Opportunity
                            </Typography>
                          </Grid>
                </Grid>
                </PageHeader>
                <PageBody>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={3}>
                    <Grid item direction="column">
                        <Typography>
                            Opportunity Name*
                        </Typography>
                    </Grid>
                    <Grid item direction="column">
                        <Typography>
                            How many volunteers required?
                        </Typography>
                    </Grid>
                    <Grid item direction="column">
                        <Typography>
                            Activity Type
                        </Typography>
                    </Grid>
                    <Grid item direction="column">
                        <Typography>
                            Preferred Sector
                        </Typography>
                    </Grid>
                {singleDayEvent ?
                    <React.Fragment>
                        <Grid item direction="column">
                            <Typography>
                                Date
                            </Typography>
                        </Grid>
                        <Grid 
                        container
                        direction="row"
                        justify="flex-start"
                        spacing={2}>
                        <Grid item direction="column">
                            <Typography>Start Time</Typography>
                        </Grid>
                        <Grid item direction="column">
                            <Typography>End Time</Typography>
                        </Grid>
                    </Grid>
                    </React.Fragment> :
                    <React.Fragment>
                        <Grid item direction="column">
                        <Typography>
                            Date(s) of Event
                        </Typography>
                    </Grid>
                    <Grid 
                        container
                        direction="row"
                        justify="flex-start"
                        spacing={2}>
                        <Grid item direction="column">
                            <Typography>Start Date</Typography>
                        </Grid>
                        <Grid item direction="column">
                            <Typography>End Date</Typography>
                        </Grid>
                    </Grid>
                    <Grid item direction="column">
                        <Typography>
                            Number of Hours
                        </Typography>
                    </Grid>
                    </React.Fragment>
                    }                      
                    <Grid item direction="column">
                        <Typography>
                            Transportation
                        </Typography>
                    </Grid>
                    <Grid item direction="column">
                        <Typography>
                            Number of Students
                        </Typography>
                    </Grid>
                    <Grid item direction="column">
                        <Typography>
                            Date(s) of Event
                        </Typography>
                    </Grid>
                    <Grid item direction="column">
                        <Typography>
                            Grades of Participating Students
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                </PageBody>

            </Grid>
        </div>
    )  
}

export default OpportunityForm
