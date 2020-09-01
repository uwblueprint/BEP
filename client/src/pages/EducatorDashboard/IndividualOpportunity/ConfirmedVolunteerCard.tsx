import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import { Volunteer } from "../../../data/types/userTypes";

const useStyles = makeStyles((theme) => ({
  retract: {
    textDecoration: "none",
    fontSize: "24px",
  },
  card: {
    margin: `${theme.spacing(2)}px auto`,
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderRadius: 5,
  },
  body: {
    fontSize: "16px",
  },
}));

const ConfirmedVolunteerCard = (props: any) => {
  const classes = useStyles();
  const volunteer: Volunteer = props.info.volunteer;

  return (
    <Card className={classes.card} elevation={0}>
      <Typography
        variant="h4"
        classes={{
          root: classes.retract,
        }}
      >
        {volunteer.firstName} {volunteer.lastName}
      </Typography>
      <Typography variant="body1" className={classes.body}>
        {volunteer.jobTitle +
          (volunteer.employer ? ` at ${volunteer.employer.name}` : "")}{" "}
        {`\u2013`} {volunteer.preferredPronouns}
      </Typography>
    </Card>
  );
};

export default ConfirmedVolunteerCard;
