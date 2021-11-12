import React from 'react';
import './App.scss';
import AppNavbar from '../AppNavbar/AppNavbar';
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import EventsFeed from '../EventsFeed/EventsFeed';
import { Octokit } from '@octokit/rest';
import FeedSettings from '../FeedSettings/FeedSettings'

export interface IState{
  octokit: Octokit,
  missRateHistory: Array<number>
}

export default class App extends React.Component {
  state: IState = {
    octokit: new Octokit(),
    missRateHistory: []
  }

  constructor(props) {
    super(props);
    this.onMissRateUpdate = this.onMissRateUpdate.bind(this)
  }

  onMissRateUpdate(newRate: number) {
    const newHistory = this.state.missRateHistory.slice();
    newHistory.push(newRate);
    if(newHistory.length > 5) {
      newHistory.shift()
    }
    this.setState({missRateHistory: newHistory})
  }

  getMissRate(): string {
    const history = this.state.missRateHistory;
    if(history.length === 0) return "**%"
    const average = Number(history.reduce((a,b) => a + b, 0)) / history.length;
    const percent = average * 100;
    return Math.round(percent * 10) / 10 + "%"
  }

  render() {
    return (
        <Fragment>
          <AppNavbar></AppNavbar>
          <Container className="mt-4">
            <FeedSettings missRate={this.getMissRate()} />
            <EventsFeed octokit={this.state.octokit} onMissRateUpdate={this.onMissRateUpdate}></EventsFeed>
          </Container>
        </Fragment>
      );
    }
}
