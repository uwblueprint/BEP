import React, { useEffect } from 'react'
import { OutlinedTextField, TextField } from '../../components/TextField'
import { fetchPicklistsService } from "../../data/services/eventPicklistServices";
import {PageHeader, PageBody} from '../../components/Page'
import Grid from '@material-ui/core/Grid'
import {BlackTextTypography} from '../../components/Typography'
import Divider from '@material-ui/core/Divider'
import { Select }  from '../../components/Select'
import { getActivityTypePicklist, getPreferredSectorPicklist } from '../../data/selectors/eventPicklistSelector'
import { connect } from "react-redux";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {Link} from 'react-router-dom'
import { ContainedButton } from '../../components/Button'
import { EventPicklistType } from '../../data/types/EventPicklistTypes';
import { withStyles } from '@material-ui/core';

const styles = () => ({
    selectTextField: {
      width: "40%",
      marginBottom: "24px",
    },
    card: {
      padding: "3em",
      backgroundColor: "#fff",
      borderRadius: "2px",
      margin: "2em 0em",
    },
  });


type OpFormProps = {
    name: string;
    requiredVolunteers: string;
    activityType: string;
    preferredSector: string;
    singleDayEvent: boolean;
    startDateAndTime: Date;
    endDateAndTime: Date;
    numberOfHours?: string;
    transportation: string;
    numberOfStudents: string;
    studentGrades: string[];
    public: boolean;
}

class OpportunityForm extends React.Component<
{ opform: OpFormProps;
    fetchPicklists: any;
    picklists: {
        activityType: { displayName: string, list: string[] };
        preferredSector: { displayName: string, list: string[] };
        studentGrades: { displayName: string, list: string[] };
    };
}, OpFormProps> {
    constructor(props: Readonly<{ opform: OpFormProps; picklists: { activityType: { displayName: string; list: string[]; }; preferredSector: { displayName: string; list: string[]; }; studentGrades: { displayName: string; list: string[]; }; }; fetchPicklists: any; }>) {
        super(props);
        console.log("These are the props", props)
        console.log("These are the component opformprops", props.opform)
        if (!props.opform) {
            console.log("Setting state")
            this.state = {
                name: "",
                requiredVolunteers: "",
                activityType: "",
                preferredSector: "",
                singleDayEvent: true,
                startDateAndTime: new Date(),
                endDateAndTime: new Date(),
                numberOfHours: "",
                transportation: "",
                numberOfStudents: "",
                studentGrades: [],
                public: false,
            };
        } else {
            this.state = props.opform
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleActivityChange = this.handleActivityChange.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
        console.log("This is the state", this.state)
    }

    componentDidMount () {
        const {fetchPicklists} = this.props
        fetchPicklists(EventPicklistType.activityType)
        fetchPicklists(EventPicklistType.preferredSector)
    }

    handleChange = (event: any) => {
        console.log(event.target.value);
        const { id, value } = event.target;
        this.setState({ ...this.state, [id]: value });
        console.log("State", this.state)
    };

    handleActivityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({activityType: event.target.value as string})
      }

    handlePreferredSectorChange = (event: React.ChangeEvent<{value: unknown}>) => {
        this.setState({preferredSector: event.target.value as string})
    }

    handleDatesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Target Val", event.target.value)
        if (event.target.value as string === "Single-day Event") {
            this.setState({singleDayEvent: true})
        } else {
            this.setState({singleDayEvent: false})
        }
      };

    render () {
        console.log("State on render", this.state)
        console.log("Props on render", this.props)
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
                            <BlackTextTypography variant="body1">
                            <Link to="/events" style={{textDecoration: "none"}}>{`<`} Back </Link>
                            </BlackTextTypography>
                            <BlackTextTypography variant="h1" style={{ marginTop: "0%" }}>
                                Create New Opportunity
                            </BlackTextTypography>
                          </Grid>
                </Grid>
                </PageHeader>
                <PageBody>
                    <Grid
                        container
                        spacing={4}
                        direction="column"
                        style={{
                        padding: "3em",
                        backgroundColor: "#fff",
                        borderRadius: "2px",
                        margin: "2em 0em",
                        }}
                    >
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Opportunity Name*
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="Grade 12 Career Panel"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            style={{ width: "50%", marginBottom: "24px", height: '50%' }}
                            />
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Number of Volunteers Required
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="How many volunteers would you need for this event"
                            id="requiredVolunteers"
                            value={this.state.requiredVolunteers}
                            onChange={this.handleChange}
                            style={{ width: "50%", marginBottom: "24px", height: '50%' }}
                            />
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Activity Type
                        </BlackTextTypography>
                        <FormControl variant="outlined">
                            <Select
                                native
                                value="Select Activity Type"
                                onChange={this.handleActivityChange}
                                style={{ width: "40%", marginBottom: "24px" }}
                                inputProps={{
                                id: "schoolBoard",
                                }}
                            >
                                <option value="">Select activity type</option>
                                {Array.from(
                                    this.props.picklists.activityType.list.entries(),
                                    (entry) => entry
                                ).map((entry, index) => (
                                    <option key={index} value={entry[1]}>
                                        {entry[1]}
                                    </option> 
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Preferred Sector
                        </BlackTextTypography>
                        <FormControl variant="outlined">
                        <Select
                            native
                            displayEmpty={true}
                            onChange={this.handlePreferredSectorChange}
                            style={{ width: "40%", marginBottom: "24px" }}
                            inputProps={{
                            id: "schoolBoard",
                            }}
                        >
                            <option value="">Select preferred sector</option>
                           {Array.from(
                                    this.props.picklists.preferredSector.list.entries(),
                                    (entry) => entry
                                ).map((entry, index) => (
                                    <option key={index} value={entry[1]}>
                                        {entry[1]}
                                    </option> 
                            ))}  
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Date(s) of Event
                        </BlackTextTypography>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="dates" name="dates" value={this.state.singleDayEvent ? "Single-day Event" : "Multi-day Event"} onChange={this.handleDatesChange}>
                                <FormControlLabel value="Single-day Event" control={<Radio />} label="Single-day Event" />
                                <FormControlLabel value="Multi-day Event" control={<Radio />} label="Multi-day Event" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                {this.state.singleDayEvent ?
                    <React.Fragment>
                        <Grid item direction="column">
                            <BlackTextTypography>
                                Date
                            </BlackTextTypography>
                        </Grid>
                        <Grid 
                        container
                        direction="row"
                        justify="flex-start"
                        spacing={2}>
                        <Grid item direction="column">
                            <BlackTextTypography>Start Time</BlackTextTypography>
                        </Grid>
                        <Grid item direction="column">
                            <BlackTextTypography>End Time</BlackTextTypography>
                        </Grid>
                    </Grid>
                    </React.Fragment> :
                    <React.Fragment>
                    <Grid 
                        container
                        direction="row"
                        justify="flex-start"
                        spacing={2}>
                        <Grid item direction="column">
                            <BlackTextTypography>Start Date</BlackTextTypography>
                        </Grid>
                        <Grid item direction="column">
                            <BlackTextTypography>End Date</BlackTextTypography>
                        </Grid>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Number of Hours
                        </BlackTextTypography>
                    </Grid>
                    </React.Fragment>
                    }                      
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Transportation
                        </BlackTextTypography>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Number of Students
                        </BlackTextTypography>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Date(s) of Event
                        </BlackTextTypography>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography>
                            Grades of Participating Students
                        </BlackTextTypography>
                    </Grid>
                </Grid>
                <Divider />
                <ContainedButton type="submit">
                    <BlackTextTypography>
                        Create Opportunity
                    </BlackTextTypography>
                </ContainedButton>
                </PageBody>

            </Grid>
        </div>
        )
    }

}

const mapStateToProps = (state: any) => {
    return {
        picklists: {
            activityType: { 
                displayName: "Activity Type", 
                list: getActivityTypePicklist(state.eventPicklists)
            },
            preferredSector: {
                displayName: "Preferred Sector",
                list: getPreferredSectorPicklist(state.eventPicklists)
            },
            studentGrades: {
                displayName: "Grades",
                list: getPreferredSectorPicklist(state.eventPicklists),
            }
        }
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    fetchPicklists: (picklistType: EventPicklistType) => {
        dispatch(fetchPicklistsService(picklistType))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(OpportunityForm));
