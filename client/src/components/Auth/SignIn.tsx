import React from 'react';
import { withRouter } from 'react-router-dom';

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
        <form>
            <div>
                <h4>BEP</h4>
            </div>
            <div>
                Email
                <br />
                Password
                <br />
                <button type="submit" onClick={this.handleSubmit}>
                    Log In
                </button>
            </div>
        </form>
    );
  }
}

export default SignIn;
