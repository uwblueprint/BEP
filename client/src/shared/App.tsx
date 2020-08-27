import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, RouteProps } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/styling/Theme";
import './App.css';
import Navbar from './Navbar';
import EducatorDashboard from '../pages/EducatorDashboard/EducatorDashboard';
import EventPage from '../pages/EducatorDashboard/IndividualOpportunity/EventPage'
import Login from '../pages/Auth/SignIn';
import VolunteerList from '../pages/VolunteerList/VolunteerList';

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
      <ThemeProvider theme={theme}>
        <Navbar />
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute exact path="/events" component={EducatorDashboard} isLoggedIn={true} />
              <PrivateRoute path="/events/:name" component={EventPage} isLoggedIn={true} />
              <PrivateRoute component={VolunteerList} exact path="/volunteers" isLoggedIn={true} />
            </Switch>
          </React.Fragment>
        </Router>
      </ThemeProvider >
    )
  }
}
