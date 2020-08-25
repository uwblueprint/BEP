import React from "react";
import VolunteerProfile from "./VolunteerProfile";

export default function ProfilePage(props: any) {
  return (
      <VolunteerProfile
        volunteer={{
          id: "SDF",
          email: "abigail.winston@email.com",
          firstName: "Abigail",
          followedPrograms: ["program"],
          isSubscribed: true,
          password: "password",
          lastName: "Winston",
          phoneNumber: "000 000 0000",
          preferredPronouns: "She/Her",
          userType: 2,
          careerDescription: "My career description is here.",
          jobTitle: "Product Manager",
          department: "dept",
          employer: {
            address: "111 Waterwoo St, Waterloo ON",
            city: "Waterloo",
            id: "str",
            name: "VoiceHero",
            phoneNumber: "000 000 0000",
            postalCode: "N2L L4G",
            sectors: ["Justice, community safety, and emergency services"],
            size: "SDF",
            socialMedia: [],
            website: "https://www.voicehero.org"
          },
          employmentStatus: "Full time",
          expertiseAreas:["Performing Arts/Entertainment", "Agriculture/Food Production"],
          extraDescription: "My extra description is here.",
          grades: ["9", "10", "11", "12"],
          introductionMethod: "intro",
          isVolunteerCoordinator: false,
          languages: ["French", "Spanish"],
          localPostSecondaryInstitutions: ["institution"],
          locations: ["Kitchener", "Waterloo", "Cambridge"],
          postSecondaryTraining: ["University"],
          professionalAssociations: [],
          reasonsForVolunteering: [],
          shareWithEmployer: false,
          volunteerDesiredExternalActivities: ["Workplace Tours", "Job Shadowning Opportunities", "Provide Co-op Placements"],
          volunteerDesiredInternalActivities: ["Career Talks", "Workshops/Presentations", "Mock Interviews & Resume Preparation"]
        }}
      />
  );
}
