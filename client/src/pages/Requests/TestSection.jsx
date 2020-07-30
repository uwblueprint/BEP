import React from 'react';
import { connect } from 'react-redux';

/* Services */
import { fetchTestService } from '../../data/services/testServices';

/* Selectors */
import { getTests } from '../../data/selectors/testSelector';

/* Components */
import { Grid } from "@material-ui/core";
import { ContainedButton, PageHeader, PageBody } from '../../components/index';

const mapStateToProps = state => ({
    users: getTests(state),
})

const mapDispatchToProps = (dispatch) => ({
    testing: () => dispatch(fetchTestService()),
})

class TestSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render () {
        const { users } = this.props;
        console.log('component accessible data ', users);
        const test = users.map((user) => (
            <div>
                <div><b>Name:</b> {user.Name}</div>
                <div><b>Email:</b> {user.Email__c}</div>
            </div>
        ))
        return (
            <div style={{ height: "100vh" }}>
                <Grid container style={{ height:"100%" }}>
                    <PageHeader header="Test Page Header"/>
                    <PageBody>
                        <ContainedButton onClick={()=>console.log(this.props.testing())}>FETCH DATA</ContainedButton>
                        <div>
                            {test}
                        </div>
                    </PageBody>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSection);
