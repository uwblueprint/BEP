import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Link, TextField } from '../../components/index';

class SignIn extends React.Component {
  constructor(props:any) {
    super(props);

    const {
      classes,
      history,
      user
    } = props;

    if (user) {
        // whatever the redirect route is supposed to be
        history.push('/');
    }

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = () => {
  }

  handleSubmit = () => {
  }

  render() {
    return (
        <form >
            <div>
                <h4>BEP</h4>
            </div>
            <div>
                Email
                <br />
                <TextField label="Password"/>
                <br />
                <Link href='#'>Forgot Password?</Link>
                <br />
                <Button onClick={this.handleSubmit}>
                    Login
                </Button>
            </div>
        </form>
    );
  }
}

export default SignIn;
