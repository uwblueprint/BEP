import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'


const useStyles = makeStyles((theme) => ({
    retract: {
        textDecoration: 'none',
        fontSize: '24px'
    },
    card: {
        margin: `${theme.spacing(2)}px auto`,
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        borderRadius: 5
      },
      body: {
        fontSize: '16px',
      },
}));

const ConfirmedVolunteerCard = (props: any) => {
    const classes = useStyles()

    console.log(props)

    return (
        <Card className={classes.card} elevation={0}>
            <Typography variant="h4" classes={{
                root: classes.retract,
            }}>{props.info.volunteer.volunteerName}</Typography>
            <Typography variant="body1" className={classes.body} >{props.info.volunteer.job} at {props.info.volunteer.company} {`\u2013`} ({props.info.volunteer.personalPronouns})</Typography>
        </Card>
    )

}

export default ConfirmedVolunteerCard