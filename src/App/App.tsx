import React from 'react';
import './App.scss';
import AppNavbar from '../AppNavbar/AppNavbar';
import { Fragment } from 'react';
import EventFeed from '../EventFeed/EventFeed'

export default class App extends React.Component {
  render() {
    return (
        <Fragment>
          <AppNavbar></AppNavbar>
          <EventFeed></EventFeed>
        </Fragment>
      );
    }
}
