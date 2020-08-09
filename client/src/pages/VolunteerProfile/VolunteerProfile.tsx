import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button";
import ProfileCard from "./ProfileCard"
import ContactCard from "./ContactCard"

class VolunteerProfile extends React.Component {
    render() {
        return(
            <div>
                <Grid container direction="row">
                    Volunteer name
                    <Button>Request</Button>
                </Grid>
                <ProfileCard
                    employmentStatus = "Full Time"
                    orgSector = "Information and Communication Technology"
                    expertiseAreas = {["Admin/Business", "HR"]}
                    postSecondaryTraining = {["University", "Other"]}
                />
                <ContactCard
                    linkedIn = "linkedin.com/anneb"
                    email = "anne.boelyn@email.com"
                />
            </div>
        );
    }
}

export default VolunteerProfile;