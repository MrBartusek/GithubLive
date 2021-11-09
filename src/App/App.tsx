import React from 'react';
import './App.scss';
import AppNavbar from '../AppNavbar/AppNavbar';
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import EventsFeed from '../EventsFeed/EventsFeed';
import { Octokit } from '@octokit/rest';

export interface IState{
  octokit: Octokit
}

export default class App extends React.Component {
  state: IState = {
    octokit: new Octokit()
  }

  render() {
    return (
        <Fragment>
          <AppNavbar></AppNavbar>
          <Container className="mt-4">
            <EventsFeed octokit={this.state.octokit}></EventsFeed>
          </Container>
        </Fragment>
      );
    }
}
