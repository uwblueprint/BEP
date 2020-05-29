import React from 'react';
import { connect } from 'react-redux';
import {getRequestTest} from '../../data/actions/requestActions';

class RequestSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render () {
        console.log(this.props);
        return (
            <div>test</div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    data: dispatch(getRequestTest())
})

export default connect(null, mapDispatchToProps)(RequestSection);
