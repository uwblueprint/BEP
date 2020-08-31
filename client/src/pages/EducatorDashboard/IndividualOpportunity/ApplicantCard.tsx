import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { ContainedButton, OutlinedButton } from '../../../components/Button'
import { updateApplicantStatus } from '../../../utils/eventsApiUtils'

export interface DialogProps {
    open: boolean;
}

const useStyles = makeStyles((theme) => ({
    card: {
        margin: `${theme.spacing(4)}px auto`,
        padding: theme.spacing(4),
        borderRadius: 10,
    },
    root: {
        paddingLeft: '25px'
    },
    title: {
        fontSize: '18px',
        fontWeight: 800
    },
    subtitle: {
        fontSize: '16px',
    },
    fieldHeader: {
        fontSize: '12px',
        marginBottom: '8px'
      },
    fieldText: {
        fontSize: '16px'
    },
    dialogTitle: {
        fontSize: '24px',
        fontWeight: 800
    },
    dialogText: {
        color: "black"
    }
}));

//create your forceUpdate hoop

const ApplicantCard = (props: any) => {
    console.log("These are the applicant Card Props", props)
    const classes = useStyles()
    const [acceptOpen, setAcceptOpen] = React.useState(false);
    const [denyOpen, setDenyOpen] = React.useState(false);

    const [buttonEnabled, setButtonEnabled] = React.useState(props.info.enabled)

    console.log("This is the buttonEnable", props.info.enabled)
    console.log("This is the Accepted", props.info.applicant.accepted)
    console.log("This is the denied", props.info.applicant.denied)

    //Press "Yes" when opening dialog box for confirming applicant acceptance
    const handleAcceptConfirm = () => {
        setAcceptOpen(false)
        //Accept the Applicant
        updateApplicantStatus(props.info.eventName, props.info.applicant.applicantName, "accept")
        setButtonEnabled(false)
    }

    //Press "Yes" when opening dialog box for confirming applicant rejection
    const handleDeclineConfirm = () => {
        setDenyOpen(false)
        //Reject the Applicant
        updateApplicantStatus(props.info.eventName, props.info.applicant.applicantName, "deny")
        setButtonEnabled(false)
    }

    //Press "No" on either dialog box
    const handleStopConfirm = () => {
        setAcceptOpen(false)
        setDenyOpen(false)
    }

    //Press "Accept" which opens Confirmation Dialog
    const handleOpenAcceptConfirm = () => {
        setAcceptOpen(true)
    }

    //Press "Decline" which opens up a Confirmation Dialog
    const handleOpenDeclineConfirm = () => {
        setDenyOpen(true)
    }

    return (
    <Card className={classes.card} elevation={0}>
    <Grid container spacing={2}>
        <Grid item xs={9}>
            <Typography variant="h5" component="h2" className={classes.title}>
                {props.info.applicant.applicantName}      
            </Typography>
            <Typography variant="body1" component="h1" className={classes.subtitle}>
                {props.info.applicant.job} {`\u2013`} {props.info.applicant.personalPronouns}
            </Typography>
        </Grid>
        <Grid item xs={3}>
            <Grid spacing={10} container  alignItems="flex-end" justify="flex-end" style={{paddingRight: 100}}>
            <Grid item xs={1} style={{marginRight: 40}}>
                <OutlinedButton onClick={handleOpenDeclineConfirm} disabled={!buttonEnabled} style={{paddingRight: 22, paddingLeft: 22}}>
                    Decline
                </OutlinedButton>
                <Dialog 
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" 
                    open={denyOpen} >
                    <DialogTitle id="alert-dialog-title"><Typography variant="h1" className={classes.dialogTitle}>Are you sure you want to <Typography className={classes.dialogTitle} style={{color: "red", display: "inline"}}>decline</Typography> {props.info.applicant.applicantName} for this event?</Typography></DialogTitle>
                    <DialogContent classes={{
                        root: classes.root,
                    }}>
                    <DialogContentText id="alert-dialog-description"><Typography className={classes.dialogText}>You cannot change your decision after this</Typography></DialogContentText>
                    </DialogContent>
                    <DialogActions style={{margin: 15}}>
                        <OutlinedButton onClick={handleStopConfirm} style={{paddingRight: 22, paddingLeft: 22}}>No</OutlinedButton>
                        <ContainedButton onClick={handleDeclineConfirm} style={{paddingRight: 22, paddingLeft: 22}}>Yes</ContainedButton>
                    </DialogActions>
                </Dialog>
            </Grid>
             <Grid item xs={1}>
                <ContainedButton onClick={handleOpenAcceptConfirm} disabled={!buttonEnabled} style={{paddingRight: 25, paddingLeft: 25}}>
                    Accept
                </ContainedButton>
                <Dialog 
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"  
                    open={acceptOpen}>
                    <DialogTitle id="alert-dialog-title"><Typography variant="h1" className={classes.dialogTitle}>Are you sure you want to <Typography className={classes.dialogTitle} style={{color: "green", display: "inline"}}>accept</Typography> {props.info.applicant.applicantName} for this event?</Typography></DialogTitle>
                    <DialogContent classes={{
                        root: classes.root,
                    }}>
                    <DialogContentText id="alert-dialog-description"><Typography className={classes.dialogText}>You cannot change your decision after this</Typography></DialogContentText>
                    </DialogContent>
                    <DialogActions style={{margin: 15}}>
                        <OutlinedButton onClick={handleStopConfirm} style={{paddingRight: 22, paddingLeft: 22}}>No</OutlinedButton>
                        <ContainedButton onClick={handleAcceptConfirm} style={{paddingRight: 22, paddingLeft: 22}}>Yes</ContainedButton>
                    </DialogActions>
                </Dialog>
             </Grid>
             </Grid>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1" component="h2" className={classes.fieldHeader}>
                SECTORS
            </Typography>
            <Typography variant="body1" component="h2" className={classes.fieldText}>
                {props.info.applicant.sectors}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1" component="h2" className={classes.fieldHeader}>
                AREAS OF EXPERTISE
            </Typography>
            <Typography variant="body1" component="h2" className={classes.fieldText}>
                {props.info.applicant.areasOfExpertise}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1" component="h2" className={classes.fieldHeader}>
                LINKEDIN URL
            </Typography>
            <Typography variant="body1" component="h2" className={classes.fieldText}>
                {props.info.applicant.linkedinUrl}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1" component="h2" className={classes.fieldHeader}>
                EMPLOYMENT STATUS
            </Typography>
            <Typography variant="body1" component="h2" className={classes.fieldText}>
                {props.info.applicant.employmentStatus}
            </Typography>
        </Grid>
    </Grid>
    </Card>
    )
}

export default ApplicantCard