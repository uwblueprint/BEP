import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

import TestSection from '../components/Requests/TestSection';

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    };
  };

  componentDidMount() {
    // auth stuff
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={TestSection}/>
          </Switch>
        </React.Fragment>
      </Router>
    )
  }
}
