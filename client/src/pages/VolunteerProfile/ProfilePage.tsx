import React from "react";
import { PageBody } from "../../components/index";
import VolunteerProfile from "./VolunteerProfile";

export default function ProfilePage(props: any) {
  return (
    <PageBody>
      <VolunteerProfile
        email="anne.boelyn@email.com"
        firstName="Anne"
        lastName="Boelyn"
        employmentStatus="Full Time"
        jobTitle="Product Manager"
        employer="VoiceHero"
        linkedIn="https://www.linkedin.com/anneb"
        expertiseAreas={["Admin/Business", "HR"]}
        sectors={["Information and Communication Technology"]}
        postSecondaryTraining={["University", "Other"]}
        description="Volunteer description"
      />
    </PageBody>
  );
}
