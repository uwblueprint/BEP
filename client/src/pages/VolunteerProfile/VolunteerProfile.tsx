import React from "react";
import Button from "../../components/Button";
import ProfileCard from "./ProfileCard"
import ContactCard from "./ContactCard"

class VolunteerProfile extends React.Component {
    render() {
        return(
            <div>
                <ProfileCard/>
                <ContactCard/>
            </div>
        );
    }
}

export default VolunteerProfile;