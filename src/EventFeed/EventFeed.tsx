import React from 'react';
import { Container } from 'react-bootstrap';
import EventList from '../EventsList/EventList';
import { Octokit } from '@octokit/rest';
import FeedSettings from '../FeedSettings/FeedSettings'
import EventType from '../utils/eventType';

export interface IFeedSettings{
  poolingSpeed: number,
  githubToken: string,
  filter: Array<EventType>
  running: boolean
}

export interface IState{
  octokit: Octokit,
  missRateHistory: Array<number>
  settings: IFeedSettings
}

export default class EventFeed extends React.Component {
  state: IState = {
    octokit: new Octokit(),
    missRateHistory: [],
    settings: {
      poolingSpeed: 15 * 1000,
      githubToken: "",
      filter: ["PUSH" as EventType],
      running: true
    }
  }

  constructor(props) {
    super(props);
    this.onMissRateUpdate = this.onMissRateUpdate.bind(this)
    this.onSettingsUpdate = this.onSettingsUpdate.bind(this)
  }

  onMissRateUpdate(newRate: number) {
    const newHistory = this.state.missRateHistory.slice();
    newHistory.push(newRate);
    if(newHistory.length > 5) {
      newHistory.shift()
    }
    this.setState({missRateHistory: newHistory})
  }

  onSettingsUpdate(newSettings: IFeedSettings) {
    this.setState({
      settings: newSettings,
      octokit: new Octokit({
        auth: newSettings.githubToken
      })
    })
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
        <Container className="mt-4">
            <FeedSettings
              missRate={this.getMissRate()}
              settings={this.state.settings}
              onSettingsUpdate={this.onSettingsUpdate}
            />
            <EventList 
              octokit={this.state.octokit}
              settings={this.state.settings}
              onMissRateUpdate={this.onMissRateUpdate}
              onSettingsUpdate={this.onSettingsUpdate}
            ></EventList>
        </Container>
      );
    }
}
