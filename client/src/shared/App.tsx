import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, RouteProps } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/styling/Theme";
import './App.css';

import Login from '../components/Auth/SignIn';
import EducatorDashboard from '../components/EducatorDashboard/EducatorDashboard';

import TestSection from '../components/Requests/TestSection';

interface IProps extends RouteProps {
  component: any;
  isLoggedIn: boolean;
}

const PrivateRoute = (props: IProps) => {
  const { component: Component, isLoggedIn, ...rest } = props;
  return (
    <Route {...rest} render={routeProps => (
      // replace true with check for login
      isLoggedIn ?
        <Component {...routeProps} />
        : <Redirect
          to={{
            pathname: "/",
            state: { from: routeProps.location }
          }}
        />
    )} />
  );
};

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    };
  };

  componentDidMount() {
    // update state with user info and loading:false
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/educator-dashboard" component={EducatorDashboard} />
            <PrivateRoute component={TestSection} exact path="/test" isLoggedIn={true} />
          </Switch>
        </React.Fragment>
      </Router>
    )
  }
}
