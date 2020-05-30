import React from 'react';
import { connect } from 'react-redux';
import { getRequestTest } from '../../data/actions/requestActions';

// map dispatch to props will be for calling APIs
// we use this instead of directly calling the API is so we can update the Redux store as well
// will change with redux-saga or thunk?
const mapDispatchToProps = async (dispatch) => ({
    data: dispatch(getRequestTest())
})

// mapStateToProps -> for selectors

class RequestSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render () {
        const {data} = this.props;
        console.log('component accessible data ', data, this.props);
        return (
            <div>test query is fetching data from the test backend API:</div>
        )
    }
}

export default connect(null, mapDispatchToProps)(RequestSection);
