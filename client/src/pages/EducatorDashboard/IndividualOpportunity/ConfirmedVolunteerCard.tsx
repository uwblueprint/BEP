import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'


const useStyles = makeStyles((theme) => ({
    retract: {
        textDecoration: 'none'
    },
    card: {
        maxWidth: 700,
        // margin: `${theme.spacing(4)}px auto`,
        padding: theme.spacing(1),
        margin: '10px',
        borderRadius: 10
    },
    root: {
        paddingLeft: '25px'
    }
}));

const ConfirmedVolunteerCard = (props: any) => {
    const classes = useStyles()

    console.log(props)

    return (
        <Card className={classes.card}>
            <Typography variant="h4" classes={{
                root: classes.retract,
            }}>{props.info.volunteer.volunteerName}</Typography>
            <Typography variant="body1">{props.info.volunteer.job} at {props.info.volunteer.company} -- ({props.info.volunteer.personalPronouns})</Typography>
        </Card>
    )

}

export default ConfirmedVolunteerCard