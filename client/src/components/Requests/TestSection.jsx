import React from 'react';
import { connect } from 'react-redux';

/* Services */
import { fetchTestService } from '../../data/services/testServices';

/* Selectors */
import { getTests } from '../../data/selectors/testSelector';

const mapStateToProps = state => ({
    users: getTests(state),
})

const mapDispatchToProps = (dispatch) => ({
    testing: dispatch(fetchTestService()),
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
            <div>
                <div>test query is fetching data from the test backend API:</div>
                <div>
                    {test}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSection);
