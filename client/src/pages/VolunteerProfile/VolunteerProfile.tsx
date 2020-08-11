import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button";
import Typography from "@material-ui/core/Typography";
import ProfileCard from "./ProfileCard"
import ContactCard from "./ContactCard"
import './Profile.css'


class VolunteerProfile extends React.Component {
    render() {
        return(
            <div>
                <Grid container direction = "row">
                    <Typography className='profile-name'>Anne Boelyn</Typography>
                    <Button>Request</Button>
                </Grid>
                <Grid>
                <Typography className='profile-title'>Product Manager at VoiceHero</Typography>
                </Grid>
                <Grid>
                <Typography className='profile-description'>Descriptionas adsd asd asd asd asd asd as dasd asd asd asd asd as das as </Typography>
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