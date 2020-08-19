import React from 'react'
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog'

import { ContainedButton, Button } from '../../../components/Button'

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
    retract: {
        color: '#A60000',
        fontWeight: "bold"
    },
    dialogTitle: {
        fontSize: '24px',
        fontWeight: 800
    },
    dialogText: {
        color: "black"
    }
}));

const InviteCard = (props: any) => {
    console.log(props)
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickAcceptClose = () => {
        setOpen(false)
    }

    const handleClickClose = () => {
        setOpen(false)
    }
    
    

    return (
    <Card className={classes.card}>
    <Grid container spacing={2}>
        <Grid item xs={9}>
            <Typography variant="h5" component="h2">
                {props.info.invite.invitationName}      
            </Typography>
            <Typography variant="body1" component="h1">
                {props.info.invite.job} -- {props.info.invite.personalPronouns}
            </Typography>
        </Grid>
        <Grid container xs={3} alignItems="flex-end" justify="flex-end" style={{paddingBottom: '50px'}}>
            <Button onClick={handleClickOpen}>
            <Typography variant="body2" component="h5" className={classes.retract}>
                    Retract Invitations
            </Typography>
            </Button> 
            <Dialog 
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"  
                    open={open}>
                    <DialogTitle><Typography variant="h1" className={classes.dialogTitle}>Are you sure you want to <Typography className={classes.dialogTitle} style={{color: "red", display: "inline"}}>retract</Typography> your invitation to {props.info.invite.invitationName}</Typography></DialogTitle>
                <DialogContent classes={{
                    root: classes.root,
                }}>
                    <DialogContentText><Typography variant="body1" className={classes.dialogText}>You cannot change your decision after this</Typography></DialogContentText>
                </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClickClose}>No</Button>
                    <ContainedButton onClick={handleClickAcceptClose}>Yes</ContainedButton>
                    </DialogActions>
                </Dialog>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1" component="h2">
                SECTORS
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.invite.sectors}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1" component="h2">
                AREAS OF EXPERTISE
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.invite.areasOfExpertise}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1" component="h2">
                LINKEDIN URL
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.invite.linkedinUrl}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1" component="h2">
                EMPLOYMENT STATUS
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.invite.employmentStatus}
            </Typography>
        </Grid>
    </Grid>
    </Card>
    )
}

export default InviteCard