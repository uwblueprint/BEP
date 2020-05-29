import React from 'react';
import { getTestService } from '../../data/services/GetTestService';

class RequestSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    async componentDidMount() {
        const { data } = await getTestService();
        console.log(data);
    }

    render () {
        return (
            <div>test</div>
        )
    }
}

export default RequestSection;
