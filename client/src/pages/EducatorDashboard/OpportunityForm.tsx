import React from 'react'
import { OutlinedTextField } from '../../components/TextField'
import { fetchPicklistsService } from "../../data/services/eventPicklistServices";
import {PageHeader, PageBody} from '../../components/Page'
import Grid from '@material-ui/core/Grid'
import {BlackTextTypography, WhiteTextTypography} from '../../components/Typography'
import Divider from '@material-ui/core/Divider'
import { getActivityTypePicklist, getPreferredSectorPicklist, gradeOfStudents } from '../../data/selectors/eventPicklistSelector'
import { connect } from "react-redux";
import Switch from '@material-ui/core/Switch';
import 'date-fns';
import { createEvent } from '../../utils/eventsApiUtils'

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

import { ContainedButton } from '../../components/Button'
import { EventPicklistType } from '../../data/types/EventPicklistTypes';
import {Event} from '../../data/types/eventTypes';
import { withStyles } from '@material-ui/core';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { Redirect } from "react-router-dom";

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
    requiredVolunteers: number | string;
    activityType: string;
    preferredSector: string[];
    singleDayEvent: boolean;
    startDateAndTime: Date | null;
    endDateAndTime: Date | null;
    numberOfHours?: number | string;
    transportation: string;
    numberOfStudents: number|string;
    gradeOfStudents: string[];
    postingExpiryDate: Date | null;
    public: boolean;
    redirect: boolean;
}

interface IProps {
    fetchPicklists: any;
    location: any;
    picklists: {
        activityType: { displayName: string, list: string[] };
        preferredSector: { displayName: string, list: string[] };
        gradeOfStudents: { displayName: string, list: string[] };
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
    getTomorrow() {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date;
    }
    getHourLater() {
        const date = this.getTomorrow();
        date.setTime(date.getTime() + (1*60*60*1000));
        return date;
    }

    constructor(props: IProps) {
        super(props);
        if (!props.location.state) {
            this.state = {
                name: "",
                requiredVolunteers: '',
                activityType: '',
                preferredSector: [],
                singleDayEvent: true,
                startDateAndTime: this.getTomorrow(),
                endDateAndTime: this.getHourLater(),
                numberOfHours: '',
                transportation: "",
                numberOfStudents: "",
                gradeOfStudents: [],
                postingExpiryDate: this.getTomorrow(),
                public: false,
                redirect: false,
            };
        } else {
            var eventData: Event = props.location.state.event
            var startDay = new Date(eventData.startDate)
            var endDay = new Date(eventData.endDate)
            var singleDayEvent = startDay.getDate() === endDay.getDate() ? true : false
            this.state = {
                name: eventData.eventName,
                requiredVolunteers: eventData.numberOfVolunteers,
                activityType: eventData.activityType,
                preferredSector: eventData.preferredSector,
                singleDayEvent: singleDayEvent,
                startDateAndTime: eventData.startDate,
                endDateAndTime: eventData.endDate,
                numberOfHours: eventData.hoursCommitment,
                transportation: eventData.schoolTransportation,
                numberOfStudents: eventData.numberOfStudents,
                gradeOfStudents: eventData.gradeOfStudents,
                postingExpiryDate: eventData.postingExpiry,
                public: eventData.isPublic,
                redirect: false,
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount () {
        const {fetchPicklists} = this.props
        fetchPicklists(EventPicklistType.activityType)
        fetchPicklists(EventPicklistType.preferredSector)
        fetchPicklists(EventPicklistType.gradeOfStudents)
    }

    handleChange = (event: any) => {
        const { id, value } = event.target;
        this.setState({ ...this.state, [id]: value });
    };

    handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
      };

    handleDatesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Retrieve from localstorage
        let localStorageUser = localStorage.getItem("user") as string
        let userJSON = JSON.parse(localStorageUser)

        let formattedEvent: any = {
            event: {
                activityType: this.state.activityType,
                contact: {
                  email: userJSON.email,
                },
                endDate: this.state.endDateAndTime,
                eventName: this.state.name,
                gradeOfStudents: this.state.gradeOfStudents,
                hoursCommitment: this.state.numberOfHours,
                isActive: true,
                isPublic: true,
                numberOfStudents: this.state.numberOfStudents,
                numberOfVolunteers: this.state.numberOfStudents,
                preferredSector: this.state.preferredSector,
                schoolTransportation: this.state.transportation,
                postingExpiry: this.state.postingExpiryDate,
                startDate: this.state.startDateAndTime
              }
        }

        const sendOpportunity = async (body: string) => {
            try {
                await createEvent(body)
            } catch (e) {
                console.error(e)
            }
        }

        sendOpportunity(formattedEvent).then(() => {
           this.setState({redirect: true})
        });
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to="/events" />
        }
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
                          <Grid item direction="column" style={{margin: '5% 0'}}>
                            <BlackTextTypography variant="body1">
                            <a href="javascript:history.back()" style={{textDecoration: "none"}}>{`<`} Back </a>
                            </BlackTextTypography>
                            <BlackTextTypography variant="h1" style={{ marginTop: "0%" }}>
                                Create New Opportunity
                            </BlackTextTypography>
                          </Grid>
                </Grid>
                </PageHeader>
                <PageBody>
                    <form
                        style={{ width: "100%" }}
                        onSubmit={this.handleSubmit}
                    >
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
                            required
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            />
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Number of Volunteers Required*
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="How many volunteers would you need for this event"
                            id="requiredVolunteers"
                            value={this.state.requiredVolunteers}
                            required
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            />
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Activity Type*
                        </BlackTextTypography>
                        <FormControl variant="outlined">
                        <Autocomplete
                            id="tags-outlined"
                            defaultValue={this.state.activityType}
                            options={this.props.picklists.activityType.list}
                            getOptionLabel={(option) => option}
                            filterSelectedOptions
                            size='small'
                            onChange={(_event, newValue) => { if (newValue) this.setState({ activityType: newValue})}}
                            renderInput={(params) => (
                            <OutlinedTextField
                                {...params}
                                style={{ width: "454px"}}
                                variant="outlined"
                                placeholder="Select Activity Type"
                            />
                        )}
                    />
                        </FormControl>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Preferred Sectors (Optional)
                        </BlackTextTypography>
                        <FormControl variant="outlined">
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            defaultValue={this.state.preferredSector}
                            options={this.props.picklists.preferredSector.list}
                            getOptionLabel={(option) => option}
                            filterSelectedOptions
                            size='small'
                            onChange={(_event, newValue) => {this.setState({preferredSector: newValue})}}
                            renderInput={(params) => (
                            <OutlinedTextField
                                {...params}
                                style={{ width: "454px"}}
                                variant="outlined"
                                placeholder="Preferred Sectors"
                            />
                        )}
                    />
                        </FormControl>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Date(s) of Event*
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
                            />
                        </Grid>
                        <Grid 
                        container
                        direction="row"
                        justify="flex-start"
                        spacing={6}>
                        <Grid item direction="column" style={{paddingLeft: 40}}>
                            <BlackTextTypography className={this.props.classes.text}>Start Time*</BlackTextTypography>
                            <KeyboardTimePicker
                                disableToolbar
                                variant="inline"
                                placeholder="Start Time"
                                value={this.state.startDateAndTime}
                                onChange={this.handleStartDateChange}
                                inputVariant="outlined"
                                id="time-picker-inline"
                                style={{ width: "202px"}}
                                keyboardIcon={<QueryBuilderIcon />}
                            />
                        </Grid>
                        
                        <Grid item direction="column">
                            <BlackTextTypography className={this.props.classes.text}>End Time*</BlackTextTypography>
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
                            <BlackTextTypography className={this.props.classes.text}>Start Date*</BlackTextTypography>
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
                            />
                        </Grid>
                        <Grid item direction="column">
                            <BlackTextTypography className={this.props.classes.text}>End Date*</BlackTextTypography>
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
                            />
                        </Grid>
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Number of Hours*
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="eg. 10 hours"
                            id="numberOfHours"
                            value={this.state.numberOfHours}
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            />
                    </Grid>
                    </React.Fragment>
                    } 
                    <Grid item direction="column">
                            <BlackTextTypography className={this.props.classes.text}>Posting Expiry</BlackTextTypography>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                placeholder="Posting Expiry Date"
                                required
                                value={this.state.postingExpiryDate}
                                onChange={(date: Date | null) => this.setState({postingExpiryDate: date})}
                                id="time-picker-inline"
                                inputVariant="outlined"
                                style={{ width: "454px"}}

                            />
                        </Grid>                     
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Event Description and Logistical Details*
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="Describe your activity to prospective volunteers and include all necessary details, such as timing, parking info and any specific expectations"
                            id="transportation"
                            value={this.state.transportation}
                            multiline
                            required
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            />
                    </Grid>
                    <Grid item direction="column">
                        <BlackTextTypography className={this.props.classes.text}>
                            Number of Students*
                        </BlackTextTypography>
                        <OutlinedTextField
                            placeholder="Enter number of students attending"
                            id="numberOfStudents"
                            required
                            value={this.state.numberOfStudents}
                            onChange={this.handleChange}
                            style={{ width: "454px"}}
                            />
                    </Grid>
                    <Grid item direction="column" style={{paddingBottom: "32px"}}>
                        <BlackTextTypography className={this.props.classes.text}>
                            Grades of Participating Students*
                        </BlackTextTypography>
                        <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={this.props.picklists.gradeOfStudents.list}
                        defaultValue={this.state.gradeOfStudents}
                        getOptionLabel={(option) => option}
                        filterSelectedOptions
                        size='small'
                        onChange={(_event, newValue) => {this.setState({gradeOfStudents: newValue})}}
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
                    <ContainedButton type="submit" style={{marginTop: "55px", padding: "15px"}}>
                        <WhiteTextTypography>
                            Create Opportunity
                        </WhiteTextTypography>
                    </ContainedButton>
                </Grid>
                </Grid>
                </form>
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
            gradeOfStudents: {
                displayName: "Grades",
                list: gradeOfStudents(state.eventPicklists),
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
