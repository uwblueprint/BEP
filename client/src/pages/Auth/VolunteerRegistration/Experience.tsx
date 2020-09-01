import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Checkbox from '@material-ui/core/Checkbox';

import {
    BlackHeaderTypography,
    BlackTextTypography,
    OutlinedTextField
  } from "../../../components/index";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

interface IComponentProps {
  currentStep: number;
  experience: {
    jobTitle: string;
    orgName: string;
    orgWebsite: string;
    orgSocialMedia: string; // this seems hard a low priority (need to add)
    orgStreetAddr: string;
    orgCity: string;
    orgPostalCode: string;
    orgPhone: string;
    departmentDivision: string; // currenlty not in userTYpes
    careerDescription: string;
    involveMethod: string; // currently not in userTypes
    extraDescription: string; // other info i'd like schools to read
  };
  picklistInfo: any;
  picklists: {
    expertiseAreas: { list: string[] };
    languages: { list: string[] };
    grades: { list: string[] }; // grade levels willing to volunteer with
    locations: { list: string[] };

    // uncomment these out once you set up all these routes Faizaan
    localPostSecondaryInstitutions: { list: string[] }; //local post secondary alumni
    professionalAssociations: { list: string[] };
    employmentStatus: { list: string[] };
    sectors: { list: string[] }; // somehow need to get picklist of
    size: { list: string[] };
    introductionMethod: { list: string[] };
    volunteerDesiredExternalActivities: { list: string[] };
    volunteerDesiredInternalActivities: { list: string[] };
    postSecondaryTraining: { list: string[] };
  };
  handleChange: any; // () => void????
  handleNestedChange: any;
  handleNestedChangePicklist: any;
}

// const styles = () => ({
//     formSection: {
//       padding: "2.5em 3em 0.5em 3em",
//     },
//     textField: {
//       marginBottom: "26px",
//       marginTop: "4px",
//     },
//     dropDowns: {
//       marginTop: "4px",
//       width: "45%",
//     },
//   });

interface IComponentState {
    experience: {
        jobTitle: string;
        orgName: string;
        orgWebsite: string;
        orgSocialMedia: string; // this seems hard a low priority (need to add)
        orgStreetAddr: string;
        orgCity: string;
        orgPostalCode: string;
        orgPhone: string;
        departmentDivision: string; // currenlty not in userTYpes
        careerDescription: string;
        involveMethod: string; // currently not in userTypes
        extraDescription: string; // other info i'd like schools to read
      };
}

class Experience extends React.Component<IComponentProps, IComponentState> {
    constructor (props : any) {
        super(props)
    }
  render() {
    if (this.props.currentStep !== 2) {
      // Prop: The current step
      return null;
    }
    // The markup for the Step 1 UI
    return (
    <React.Fragment>
      <div className="form-group">
        <div style={{ height: "100vh" }}>
            <Grid container style={{ height: "100%" }}>
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
                        <Grid item>
                        <BlackHeaderTypography>About Your Work</BlackHeaderTypography>
                        </Grid>

                        <Grid item direction="column">
                        <FormControl variant="outlined">
                            <BlackHeaderTypography>
                                Employment Status
                            </BlackHeaderTypography>
                                <Select
                                    value={this.props.picklistInfo.employmentStatus}
                                    name="employmentStatus"
                                    displayEmpty
                                    disableUnderline={true}
                                    onChange={this.props.handleNestedChangePicklist(
                                        this.props.picklistInfo
                                    )}>
                                        <MenuItem value="" disabled>
                                            Select your employment status
                                        </MenuItem>
                                        {Array.from(
                                            this.props.picklists.employmentStatus.list.entries(),
                                            (entry) => entry
                                        ).map((entry, index) => (
                                            <MenuItem key={index} value={entry[1]}>
                                            {entry[1]}
                                            </MenuItem>
                                        ))}
                                </Select>
                        </FormControl>
                        </Grid>

                        <Grid item direction="column">
                        <FormControl>
                            <BlackHeaderTypography>
                                Current Job Title/Position*
                            </BlackHeaderTypography>
                        <OutlinedTextField
                            placeholder="e.g Product Manager"
                            name="jobTitle"
                            style={{ width: "454px"}}
                            value={this.props.experience.jobTitle}
                            onChange={this.props.handleNestedChange(this.props.experience)}
                            />
                        </FormControl>
                        </Grid>

                        <Grid item direction="column">
                        <FormControl>
                            <BlackHeaderTypography>
                                Employer
                            </BlackHeaderTypography>
                            <OutlinedTextField
                                placeholder="Enter your employer's name"
                                name="orgName"
                                style={{ width: "454px"}}
                                value={this.props.experience.orgName}
                                onChange={this.props.handleNestedChange(this.props.experience)}
                            />
                        </FormControl>
                        </Grid>

                                                
                        <Grid item direction="column">
                        <FormControl>
                            <BlackHeaderTypography>
                                Organization Sector
                            </BlackHeaderTypography>
                            <Select
                                    value={this.props.picklistInfo.sectors}
                                    name="sectors"
                                    displayEmpty
                                    disableUnderline={true}
                                    onChange={this.props.handleNestedChangePicklist(
                                        this.props.picklistInfo
                                    )}>
                                        <MenuItem value="" disabled>
                                            Select your employment status
                                        </MenuItem>
                                        {Array.from(
                                            this.props.picklists.sectors.list.entries(),
                                            (entry) => entry
                                        ).map((entry, index) => (
                                            <MenuItem key={index} value={entry[1]}>
                                            {entry[1]}
                                            </MenuItem>
                                        ))}
                                </Select>
                        </FormControl>
                        </Grid>

                        <Grid item direction="column">
                        <FormControl>
                            <BlackHeaderTypography>
                                Organization Website
                            </BlackHeaderTypography>
                        <OutlinedTextField
                            placeholder="Enter your organization's website"
                            name="orgWebsite"
                            style={{ width: "454px"}}
                            value={this.props.experience.orgWebsite}
                            onChange={this.props.handleNestedChange(this.props.experience)}
                            />
                        </FormControl>
                        </Grid>


                        <Grid item direction="column">
                        <FormControl>
                            <BlackHeaderTypography>
                                Organization Social Media
                            </BlackHeaderTypography>
                        <OutlinedTextField
                            placeholder="Enter your organization's social media link"
                            name="orgSocialMedia"
                            style={{ width: "454px"}}
                            value={this.props.experience.orgSocialMedia}
                            onChange={this.props.handleNestedChange(this.props.experience)}
                            />
                        </FormControl>
                        </Grid>

                        <Grid item direction="column">
                        <FormControl>
                            <BlackHeaderTypography>
                                Organization Street Address
                            </BlackHeaderTypography>
                        <OutlinedTextField
                            placeholder="e.g Street Number, street name"
                            name="orgStreetAddr"
                            style={{ width: "454px"}}
                            value={this.props.experience.orgStreetAddr}
                            onChange={this.props.handleNestedChange(this.props.experience)}
                            />
                        </FormControl>
                        </Grid>

                        <Grid container direction="row" spacing={2}>
                            <Grid item direction="column">
                            <FormControl>
                                <BlackHeaderTypography>
                                    Organization City
                                </BlackHeaderTypography>
                            <OutlinedTextField
                                placeholder="Enter Organization's City"
                                name="orgCity"
                                style={{ width: "454px"}}
                                value={this.props.experience.orgCity}
                                onChange={this.props.handleNestedChange(this.props.experience)}
                            />
                            </FormControl>
                            </Grid>
                            <Grid item direction="column">
                            <FormControl>
                                <BlackHeaderTypography>
                                    Organization Postal Code
                                </BlackHeaderTypography>
                            <OutlinedTextField
                                placeholder="A1A 1A1"
                                name="orgPostalCode"
                                style={{ width: "454px"}}
                                value={this.props.experience.orgPostalCode}
                                onChange={this.props.handleNestedChange(this.props.experience)}
                            />
                            </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item direction="column">
                            <FormControl>
                                <BlackHeaderTypography>
                                    Organization Phone
                                </BlackHeaderTypography>
                            <OutlinedTextField
                                placeholder="e.g 000 000 0000"
                                type="number"
                                name="orgPhone"
                                style={{ width: "454px"}}
                                value={this.props.experience.orgPhone}
                                onChange={this.props.handleNestedChange(this.props.experience)}
                            />
                            </FormControl>
                            </Grid>

                            <Grid item direction="column">
                            <FormControl>
                                <BlackHeaderTypography>
                                    Department or Division
                                </BlackHeaderTypography>
                            <OutlinedTextField
                                placeholder="Eg. Human Resources"
                                name="departmentDivision"
                                style={{ width: "454px"}}
                                value={this.props.experience.departmentDivision}
                                onChange={this.props.handleNestedChange(this.props.experience)}
                            />
                            </FormControl>
                            </Grid>

                            <Grid item direction="column">
                            <FormControl>
                                <BlackHeaderTypography>
                                    Number of Staff in Organization
                                </BlackHeaderTypography>
                                <Select
                                    value={this.props.picklistInfo.size}
                                    name="size"
                                    displayEmpty
                                    disableUnderline={true}
                                    onChange={this.props.handleNestedChangePicklist(
                                        this.props.picklistInfo
                                    )}>
                                        <MenuItem value="" disabled>
                                            Select the number of staff in your organization
                                        </MenuItem>
                                        {Array.from(
                                            this.props.picklists.size.list.entries(),
                                            (entry) => entry
                                        ).map((entry, index) => (
                                            <MenuItem key={index} value={entry[1]}>
                                            {entry[1]}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                            </Grid>

                            <Grid container direction="column">
                                <Grid container direction="row" spacing={2}>
                                    <Checkbox />
                                    <BlackHeaderTypography>
                                        Share volunteer acitivity with Employee
                                    </BlackHeaderTypography>
                                </Grid>
                                <Grid container direction="row" spacing={2}>
                                    <Checkbox />
                                    <BlackHeaderTypography>
                                        List employer on BEP public facing website
                                    </BlackHeaderTypography>
                                </Grid>
                                <Grid container direction="row" spacing={2}>
                                    <Checkbox />
                                    <BlackHeaderTypography>
                                        I am a contact for coordinating involvement and/or recruiting other volunteers in my company
                                    </BlackHeaderTypography>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <BlackTextTypography>Your knowledge and expertise</BlackTextTypography>
                            </Grid>

                            <Grid item direction="column">
                                <FormControl>
                                    <BlackHeaderTypography>
                                        Post Secondary Training I've participated in
                                    </BlackHeaderTypography>
                                    <Select></Select>
                                </FormControl>
                            </Grid>

                            <Grid container direction="column">
                                <Grid container direction="row" spacing={2}>
                                    <Checkbox />
                                    <BlackHeaderTypography>
                                        Apprenticeship
                                    </BlackHeaderTypography>
                                </Grid>
                                <Grid container direction="row" spacing={2}>
                                    <Checkbox />
                                    <BlackHeaderTypography>
                                        College
                                    </BlackHeaderTypography>
                                </Grid>
                                <Grid container direction="row" spacing={2}>
                                    <Checkbox />
                                    <BlackHeaderTypography>
                                        University
                                    </BlackHeaderTypography>
                                </Grid>
                            </Grid>

                            <Grid item direction="column">
                                <FormControl>
                                    <BlackHeaderTypography>
                                        Languages
                                    </BlackHeaderTypography>
                                    <Select></Select>
                                </FormControl>
                            </Grid>

                            <Grid item direction="column">
                                <FormControl>
                                    <BlackHeaderTypography>
                                        Description of my Career
                                    </BlackHeaderTypography>
                                    <OutlinedTextField
                                        placeholder="1 Sentence"
                                        id="title"
                                        style={{ width: "454px"}}
                                        />
                                </FormControl>
                            </Grid>

                            <Grid item direction="column">
                                <FormControl>
                                    <BlackHeaderTypography>
                                        How I got involved in my Field
                                    </BlackHeaderTypography>
                                    <OutlinedTextField
                                        placeholder="I sentence"
                                        id="title"
                                        style={{ width: "454px"}}
                                        />
                                </FormControl>
                            </Grid>


                            <Grid item direction="column">
                                <FormControl>
                                    <BlackHeaderTypography>
                                        Other information I'd like schools to read
                                    </BlackHeaderTypography>
                                    <OutlinedTextField
                                        placeholder="e.g other topics you can talk about, etc"
                                        id="title"
                                        style={{ width: "454px"}}
                                        />
                                </FormControl>
                            </Grid>

                            
 





        </Grid>
        </Grid>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Experience;
