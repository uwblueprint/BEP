import React, { useEffect } from 'react'
import { OutlinedTextField, TextField } from '../../components/TextField'
import { fetchPicklistsService } from "../../data/services/eventPicklistServices";
import {PageHeader, PageBody} from '../../components/Page'
import Grid from '@material-ui/core/Grid'
import {BlackTextTypography, WhiteTextTypography} from '../../components/Typography'
import Divider from '@material-ui/core/Divider'
import { Select }  from '../../components/Select'
import { getActivityTypePicklist, getPreferredSectorPicklist } from '../../data/selectors/eventPicklistSelector'
import { connect } from "react-redux";
import Switch from '@material-ui/core/Switch';
import 'date-fns';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {Link} from 'react-router-dom'
import { ContainedButton } from '../../components/Button'
import { EventPicklistType } from '../../data/types/EventPicklistTypes';
import { withStyles } from '@material-ui/core';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

const grades = ["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]

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
    datePicker: {
        padding: "0px 10px",
        width: "15vw",
        backgroundColor: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "2px",
      },
    input: {
        height: 2,
        backgroundColor: "#fff",
    },
    timePicker: {
        padding: "0px 10px",
        width: "10vw",
        backgroundColor: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "2px",
    },
    text: {
        paddingBottom: 4
    }
  });


type OpFormProps = {
    name: string;
    requiredVolunteers: string;
    activityType: string;
    preferredSector: string;
    singleDayEvent: boolean;
    startDateAndTime: Date | null;
    endDateAndTime: Date | null;
    numberOfHours?: string;
    transportation: string;
    numberOfStudents: string;
    studentGrades: string[];
    public: boolean;
}

interface IProps {
    opform: OpFormProps;
    fetchPicklists: any;
    picklists: {
        activityType: { displayName: string, list: string[] };
        preferredSector: { displayName: string, list: string[] };
        studentGrades: { displayName: string, list: string[] };
    };
    classes: {
        selectTextField: any;
        card: any;
        datePicker: any;
        input: any;
        timePicker: any;
        text: any;
    };
}

class OpportunityForm extends React.Component<IProps, OpFormProps> {
    constructor(props: IProps) {
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
        this.handleSubmit = this.handleSubmit.bind(this)
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

    handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
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

    handleStartDateChange = (date: Date | null) => {
        this.setState({startDateAndTime: date})
    };

    handleEndDateChange = (date: Date | null) => {
        this.setState({endDateAndTime: date})
    }

    handleSubmit = (event: any) => {
        
    }



    render () {
        console.log("State on render", this.state)
        console.log("Props on render", this.props)
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                        <BlackTextTypography className={this.props.classes.text}>
                            Opportunity Name*
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="Grade 12 Career Panel"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            InputProps={{ classes: { input: this.props.classes.input } }}
                            />
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Number of Volunteers Required
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="How many volunteers would you need for this event"
                            id="requiredVolunteers"
                            value={this.state.requiredVolunteers}
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            InputProps={{ classes: { input: this.props.classes.input } }}
                            />
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Activity Type
                        </BlackTextTypography>
                        <FormControl variant="outlined">
                            <Select
                                native
                                displayEmpty={true}
                                onChange={this.handleActivityChange}
                                style={{ width: "454px", height: "40px" }}
                                inputProps={{
                                id: "activityType",
                                classes: { input: this.props.classes.input }
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
                        <BlackTextTypography className={this.props.classes.text}>
                            Preferred Sector
                        </BlackTextTypography>
                        <FormControl variant="outlined">
                        <Select
                            native
                            displayEmpty={true}
                            onChange={this.handlePreferredSectorChange}
                            style={{ width: "454px", height: "40px" }}
                            inputProps={{
                            id: "preferredSector",
                            classes: { input: this.props.classes.input }
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
                        <BlackTextTypography className={this.props.classes.text}>
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
                            <BlackTextTypography className={this.props.classes.text}>
                                Date*
                            </BlackTextTypography>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                placeholder="Date"
                                value={this.state.startDateAndTime}
                                onChange={this.handleStartDateChange}
                                format="MM/dd/yyyy"
                                id="date-picker-inline"
                                inputVariant="outlined"
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                style={{ width: "454px"}}
                                InputProps={{ classes: { input: this.props.classes.input } }}
                            />
                        </Grid>
                        <Grid 
                        container
                        direction="row"
                        justify="flex-start"
                        spacing={6}>
                        <Grid item direction="column" style={{paddingLeft: 40}}>
                            <BlackTextTypography className={this.props.classes.text}>Start Time</BlackTextTypography>
                            <KeyboardTimePicker
                                disableToolbar
                                variant="inline"
                                placeholder="Start Time"
                                value={this.state.startDateAndTime}
                                onChange={this.handleStartDateChange}
                                inputVariant="outlined"
                                id="time-picker-inline"
                                style={{ width: "202px"}}
                                InputProps={{ classes: { input: this.props.classes.input } }}
                                keyboardIcon={<QueryBuilderIcon />}
                            />
                        </Grid>
                        
                        <Grid item direction="column">
                            <BlackTextTypography className={this.props.classes.text}>End Time</BlackTextTypography>
                            <KeyboardTimePicker
                                disableToolbar
                                variant="inline"
                                placeholder="End Time"
                                value={this.state.endDateAndTime}
                                onChange={this.handleEndDateChange}
                                id="time-picker-inline"
                                inputVariant="outlined"
                                style={{ width: "202px"}}
                                keyboardIcon={<QueryBuilderIcon />}

                                InputProps={{ classes: { input: this.props.classes.input } }}
                            />
                        </Grid>
                    </Grid>
                    </React.Fragment> :
                    <React.Fragment>
                    <Grid 
                        container
                        direction="row"
                        justify="flex-start"
                        spacing={6}
                        style={{paddingLeft: 20}}>
                        <Grid item direction="column">
                            <BlackTextTypography className={this.props.classes.text}>Start Date</BlackTextTypography>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline" 
                                placeholder="Date"
                                value={this.state.startDateAndTime}
                                onChange={this.handleStartDateChange}
                                format="MM/dd/yyyy"
                                margin="normal"
                                inputVariant="outlined"
                                id="date-picker-inline"
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                style={{ width: "202px"}}
                                InputProps={{ classes: { input: this.props.classes.input } }}
                            />
                        </Grid>
                        <Grid item direction="column">
                            <BlackTextTypography className={this.props.classes.text}>End Date</BlackTextTypography>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                placeholder="Date"
                                value={this.state.endDateAndTime}
                                onChange={this.handleEndDateChange}
                                format="MM/dd/yyyy"
                                margin="normal"
                                inputVariant="outlined"
                                id="date-picker-inline"
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                style={{ width: "202px"}}
                                InputProps={{ classes: { input: this.props.classes.input } }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Number of Hours
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="eg. 10 hours"
                            id="numberOfHours"
                            value={this.state.numberOfHours}
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            InputProps={{ classes: { input: this.props.classes.input } }}
                            />
                    </Grid>
                    </React.Fragment>
                    }                      
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Event Description and Logistical Details
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="Describe your activity to prospective volunteers and include all necessary details, such as timing, parking info and any specific expectations"
                            id="transportation"
                            value={this.state.transportation}
                            multiline
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            InputProps={{ classes: { input: this.props.classes.input } }}
                            />
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Number of Students
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="Enter number of students attending"
                            id="numberOfStudents"
                            value={this.state.numberOfStudents}
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            InputProps={{ classes: { input: this.props.classes.input } }}
                            />
                    </Grid>
                    <Grid item direction="column" style={{paddingBottom: "32px"}}>
                        <BlackTextTypography className={this.props.classes.text}>
                            Grades of Participating Students
                        </BlackTextTypography>
                        <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={grades}
                        getOptionLabel={(option) => option}
                        filterSelectedOptions
                        onChange={(_event, newValue) => {this.setState({studentGrades: newValue})}}
                        renderInput={(params) => (
                        <OutlinedTextField
                            {...params}
                            style={{ width: "454px"}}
                            variant="outlined"
                            placeholder="Select the Grades of Participating Students"
                        />
                        )}
                    />
                    </Grid>
                    <Divider />
                <Grid item direction="column" style={{paddingTop: "33px", paddingBottom: "57px"}}>
                    <Grid container
                        direction="row"
                        justify="flex-start"
                        spacing={2}>
                <Switch
                        checked={this.state.public}
                        onChange={this.handlePublicChange}
                        name="public"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <BlackTextTypography style={{paddingTop: 8}}>Allow all volunteers to see and express interest in this opportunity</BlackTextTypography>
                    </Grid>
                    <ContainedButton type="submit" onClick={this.handleSubmit} style={{marginTop: "55px", padding: "15px"}}>
                        <WhiteTextTypography>
                            Create Opportunity
                        </WhiteTextTypography>
                    </ContainedButton>
                </Grid>
                </Grid>
                </PageBody>

            </Grid>
        </div>
        </MuiPickersUtilsProvider>
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
