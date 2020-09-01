import React from "react";
import { connect } from "react-redux";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Snackbar from '@material-ui/core/Snackbar';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Link from "@material-ui/core/Link";
import {
  ContainedButton,
  OutlinedButton,
  SecondaryMainTextTypography,
} from "../../../components/index";

import Application, {
  ApplicationStatus,
} from "../../../data/types/applicationTypes";
import { Volunteer } from "../../../data/types/userTypes";
import { updateApplicationService } from "../../../data/services/applicationsService";

export interface DialogProps {
  open: boolean;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(4)}px auto`,
    padding: theme.spacing(4),
    borderRadius: 10,
  },
  root: {
    paddingLeft: "25px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 800,
  },
  subtitle: {
    fontSize: "16px",
  },
  fieldHeader: {
    fontSize: "12px",
    marginBottom: "8px",
  },
  fieldText: {
    fontSize: "16px",
  },
  dialogTitle: {
    fontSize: "24px",
    fontWeight: 800,
  },
  dialogText: {
    color: "black",
  },
}));

//create your forceUpdate hoop

const ApplicantCard = (props: any) => {
  const classes = useStyles();
  const [acceptOpen, setAcceptOpen] = React.useState(false);
  const [denyOpen, setDenyOpen] = React.useState(false);
      
    const [applicantAcceptedSnackbar, setAcceptSnackbarOpen] = React.useState(false)
    const [applicantDenySnackbar, setDenySnackbarOpen] = React.useState(false)
    
    
    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAcceptSnackbarOpen(false);
        setDenySnackbarOpen(false)
    };

  const { info, updateApplication } = props;
  const [buttonEnabled, setButtonEnabled] = React.useState(info.enabled);
  const application: Application = info.application;
  const volunteer: Volunteer = application.volunteer;
  const volunteerName: string = volunteer.firstName + " " + volunteer.lastName;

  //Press "Yes" when opening dialog box for confirming applicant acceptance
  const handleAcceptConfirm = () => {
    setAcceptOpen(false);
    const newApplication: Application = application;
    newApplication.status = ApplicationStatus.ACCEPTED;
    //Accept the Applicant
    updateApplication(newApplication);
    setButtonEnabled(false);
  };

  //Press "Yes" when opening dialog box for confirming applicant rejection
  const handleDeclineConfirm = () => {
    setDenyOpen(false);
    const newApplication: Application = application;
    newApplication.status = ApplicationStatus.DECLINED;
    //Reject the Applicant
    updateApplication(newApplication);
    setButtonEnabled(false);
  };

  //Press "No" on either dialog box
  const handleStopConfirm = () => {
    setAcceptOpen(false);
    setDenyOpen(false);
  };

  //Press "Accept" which opens Confirmation Dialog
  const handleOpenAcceptConfirm = () => {
    setAcceptOpen(true);
  };

  //Press "Decline" which opens up a Confirmation Dialog
  const handleOpenDeclineConfirm = () => {
    setDenyOpen(true);
  };

  return (
    <Card className={classes.card} elevation={0}>
      <Snackbar open={applicantAcceptedSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="info">
                You have accepted {props.info.applicant.applicantName} for this event.
            </Alert>
      </Snackbar>
        <Snackbar open={applicantDenySnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="info">
                You have declined {props.info.applicant.applicantName} for this event.
            </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Typography variant="h5" component="h2" className={classes.title}>
            {volunteerName}
          </Typography>
          <Typography
            variant="body1"
            component="h1"
            className={classes.subtitle}
          >
            {volunteer.jobTitle +
              (volunteer.employer ? ` at ${volunteer.employer.name}` : "")}{" "}
            {`\u2013`} {volunteer.preferredPronouns}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid
            spacing={10}
            container
            alignItems="flex-end"
            justify="flex-end"
            style={{ paddingRight: 100 }}
          >
            <Grid item xs={1} style={{ marginRight: 40 }}>
              <OutlinedButton
                onClick={handleOpenDeclineConfirm}
                disabled={!buttonEnabled}
                style={{ paddingRight: 22, paddingLeft: 22 }}
              >
                Decline
              </OutlinedButton>
              <Dialog
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={denyOpen}
              >
                <DialogTitle id="alert-dialog-title">
                  <Typography variant="h1" className={classes.dialogTitle}>
                    Are you sure you want to{" "}
                    <Typography
                      className={classes.dialogTitle}
                      style={{ color: "red", display: "inline" }}
                    >
                      decline
                    </Typography>{" "}
                    {volunteerName} for this event?
                  </Typography>
                </DialogTitle>
                <DialogContent
                  classes={{
                    root: classes.root,
                  }}
                >
                  <DialogContentText id="alert-dialog-description">
                    <Typography className={classes.dialogText}>
                      You cannot change your decision after this
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: 15 }}>
                  <OutlinedButton
                    onClick={handleStopConfirm}
                    style={{ paddingRight: 22, paddingLeft: 22 }}
                  >
                    No
                  </OutlinedButton>
                  <ContainedButton
                    onClick={handleDeclineConfirm}
                    style={{ paddingRight: 22, paddingLeft: 22 }}
                  >
                    Yes
                  </ContainedButton>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item xs={1}>
              <ContainedButton
                onClick={handleOpenAcceptConfirm}
                disabled={!buttonEnabled}
                style={{ paddingRight: 25, paddingLeft: 25 }}
              >
                Accept
              </ContainedButton>
              <Dialog
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={acceptOpen}
              >
                <DialogTitle id="alert-dialog-title">
                  <Typography variant="h1" className={classes.dialogTitle}>
                    Are you sure you want to{" "}
                    <Typography
                      className={classes.dialogTitle}
                      style={{ color: "green", display: "inline" }}
                    >
                      accept
                    </Typography>{" "}
                    {volunteerName} for this event?
                  </Typography>
                </DialogTitle>
                <DialogContent
                  classes={{
                    root: classes.root,
                  }}
                >
                  <DialogContentText id="alert-dialog-description">
                    <Typography className={classes.dialogText}>
                      You cannot change your decision after this
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: 15 }}>
                  <OutlinedButton
                    onClick={handleStopConfirm}
                    style={{ paddingRight: 22, paddingLeft: 22 }}
                  >
                    No
                  </OutlinedButton>
                  <ContainedButton
                    onClick={handleAcceptConfirm}
                    style={{ paddingRight: 22, paddingLeft: 22 }}
                  >
                    Yes
                  </ContainedButton>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.fieldHeader}
          >
            SECTORS
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.fieldText}
          >
            {volunteer.employer ? volunteer.employer.sectors.join(", ") : ""}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.fieldHeader}
          >
            AREAS OF EXPERTISE
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.fieldText}
          >
            {volunteer.expertiseAreas}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.fieldHeader}
          >
            LINKEDIN URL
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.fieldText}
          >
            {volunteer.linkedIn && (
              <Link target="_blank" href={volunteer.linkedIn}>
                <SecondaryMainTextTypography variant="body1">
                  {
                    volunteer.linkedIn
                      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
                      .split("/")[0] // Remove protocol and 'www'
                  }
                </SecondaryMainTextTypography>
              </Link>
            )}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.fieldHeader}
          >
            EMPLOYMENT STATUS
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.fieldText}
          >
            {volunteer.employmentStatus}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {};

const mapDispatchToProps = (dispatch: any) => ({
  updateApplication: (application: Application) =>
    dispatch(updateApplicationService(application)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantCard);
