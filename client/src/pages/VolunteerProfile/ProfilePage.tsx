import React from "react";
import VolunteerProfile from "./VolunteerProfile";

export default function ProfilePage(props: any) {
    return(
        <VolunteerProfile
            email = "anne.boelyn@email.com"
            firstName = "Anne"
            lastName = "Boelyn"
            employmentStatus = "Full Time"
            jobTitle = "Product Manager"
            employer = "VoiceHero"
            linkedIn = "https://www.linkedin.com/anneb"
            expertiseAreas = {["Admin/Business", "HR"]}
            sectors = {["Admin/Business", "HR"]}
            postSecondaryTraining = {["University", "Other"]}
        />
    );
}