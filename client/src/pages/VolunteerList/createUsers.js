import axios from "axios";
import { baseURL } from "../../utils/ApiUtils";

const volunteerDesiredExternalActivities = [
  //   "Co-op Placement",
  //   "Business Case Challenge",
  //   "Informational Interview",
  //   "Job Shadowing",
  //   "Mentoring",
  //   "Sector Partnered Contextualized Experience",
  //   "Workplace Tour",
  "CoopPlacement",
  "BusinessCaseChallenge",
  "InformationalInterview",
  "JobShadowing",
  "Mentoring",
  "SectorPartneredContextualizedExperience",
  "WorkplaceTour",
];
const volunteerDesiredInternalActivities = [
  //   "Career Fairs",
  //   "Career Talks",
  //   "Job Search Preparation",
  //   "Judging",
  //   "Mentoring",
  //   "Workshops",

  "CareerFairs",
  "CareerTalks",
  "JobSearchPrep",
  "Judging",
  "Mentoring",
  "Workshops",
];
const postSecondaryTraining = ["Apprenticeship", "College", "University"];
const expertiseAreas = [
  "Admin/Business",
  "Aerospace/Aviation",
  "Agriculture/Food Production",
  "Building/Construction",
  "Catering/Hospitality",
  "Childcare",
  "Design/Arts",
  "Education/Training",
  "Emergency Services",
  "Energy/Utilities",
  "Engineering",
  "Environment",
  "Financial/Insurance/Banking",
  "Government",
  "Healthcare",
  "Human Resources",
  "IT/Computers",
  "Languages/Culture",
  "Legal",
  "Leisure/Sports/Tourism",
  "Manufacturing/Production",
  "Marketing/Advertising",
  "Media/Print/Publishing",
  "Performing Arts/Entertainment",
  "Personal/Other Services",
  "PR/Communications",
  "Retail/Customer Service",
  "Science/Technology",
  "Security/Armed Forces",
  "Social Work/Counselling",
  "Transportation/Logistics",
  "Telecommunications",
  "Not for Profit",
  "Other",
];
const grades = ["Grades K-4", "Grades 4-8", "Grades 9-12"];
const firstNames = [
  "Liam",
  "Noah",
  "William",
  "James",
  "Logan",
  "Benjamin",
  "Mason",
  "Elijah",
  "Oliver",
  "Jacob",
  "Emma",
  "Olivia",
  "Ava",
  "Isabella",
  "Sophia",
  "Charlotte",
  "Mia",
  "Amelia",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
  "Martinez",
];
const jobTitles = [
  "Marketing Coordinator",
  "Medical Assistant",
  "Web Designer",
  "Dog Trainer",
  "President of Sales",
  "Nursing Assistant",
  "Project Manager",
  "Librarian",
  "Project Manager",
  "Account Executive",
];
const companies = [
  "Apple",
  "Microsoft",
  "Amazon",
  "Alphabet",
  "Berkshire",
  "Facebook",
  "Alibaba",
  "Tencent",
  "JPMorgan",
  "Johnson",
  "Visa",
  "ExxonMobil",
  "ICBC",
];

function getRandomInt(max) {
  return Math.ceil(Math.random() * Math.floor(max));
}

function getArrayValues(array, numValues) {
  let startIndex = getRandomInt(array.length) - 1;
  let endIndex =
    startIndex + numValues <= array.length
      ? startIndex + numValues
      : array.length;
  let ret = array.slice(startIndex, endIndex);
  startIndex = 0;

  endIndex = numValues - ret.length;
  ret.concat(array.slice(startIndex, endIndex));

  return ret;
}

export default function createUser() {
  const firstName = firstNames[getRandomInt(firstNames.length)];
  const lastName = lastNames[getRandomInt(lastNames.length)];
  const user = {
    email: `${firstName}.${lastName}@uwblueprint.org`,
    firstName,
    followedPrograms: [],
    lastName,
    isSubscribed: true,
    password: "123456",
    phoneNumber: 1234567890,
    preferredPronouns: "She/Her",
    userType: 2,
    careerDescription: "generic career description",
    coopPlacementMode: "virtual",
    coopPlacementSchoolAffiliation: "tdsb",
    coopPlacementTime: ["after school"],
    jobTitle: jobTitles[getRandomInt(jobTitles.length)],
    department: "accounting",
    employerName: companies[getRandomInt(companies.length)],
    employmentStatus: "employed",
    expertiseAreas: getArrayValues(expertiseAreas, getRandomInt(4)),
    extraDescription: "nothing much to say",
    grades: getArrayValues(grades, getRandomInt(3)),
    introductionMethod: "A BEP volunteer or participating employer",
    isVolunteerCoordinator: true,
    languages: ["Japanese", "Polish"],
    linkedIn: "https://www.linkedin.com/",
    localPostSecondaryInstitutions: ["Univeristy of Waterloo"],
    locations: ["North Dumfries", "Waterloo"],
    postSecondaryTraining: getArrayValues(
      postSecondaryTraining,
      getRandomInt(postSecondaryTraining.length)
    ),
    professionalAssociations: ["Canadian Institute of Chartered Accountants"],
    reasonsForVolunteering: [
      "Represent my company",
      "Support education in Waterloo Region",
    ],
    volunteerDesiredExternalActivities: getArrayValues(
      volunteerDesiredExternalActivities,
      getRandomInt(5)
    ),
    volunteerDesiredInternalActivities: getArrayValues(
      volunteerDesiredInternalActivities,
      getRandomInt(5)
    ),
  };

  const config = {
    url: `${baseURL}api/users/`,
    method: "post",
    data: user,
  };

  console.log(user);
  axios.request(config);
}
