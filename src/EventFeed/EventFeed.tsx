import React from 'react';
import { Container } from 'react-bootstrap';
import EventList from '../EventsList/EventList';
import { Octokit } from '@octokit/rest';
import FeedSettings from '../FeedSettings/FeedSettings'
import EventType from '../utils/eventType';

export interface IFeedSettings{
  poolingSpeed: number,
  githubToken: string,
  githubTokenValid: boolean,
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
      poolingSpeed: 60 * 1000,
      githubToken: "",
      githubTokenValid: false,
      filter: ["PUSH" as EventType],
      running: true
    }
  }

  constructor(props) {
    super(props);
    this.onMissRateUpdate = this.onMissRateUpdate.bind(this)
    this.onSettingsUpdate = this.onSettingsUpdate.bind(this)
    this.onMissRateClear = this.onMissRateClear.bind(this)
  }

  onMissRateUpdate(newRate: number) {
    const newHistory = this.state.missRateHistory.slice();
    newHistory.push(newRate);
    if(newHistory.length > 5) {
      newHistory.shift()
    }
    this.setState({missRateHistory: newHistory})
  }

  onMissRateClear() {
    this.setState({missRateHistory: []})
  }

  async onSettingsUpdate(newSettings: IFeedSettings) {
    // Validate new github token
    if(this.state.settings.githubToken !== newSettings.githubToken) {
      const octokit = new Octokit({auth: newSettings.githubToken});
      await octokit.rateLimit.get()
        .then((resp) => {
          const valid = resp.data.resources.core.limit > 1000
          newSettings.githubTokenValid = valid
        }).catch(() => {
          newSettings.githubTokenValid = false
        })
        if(newSettings.githubTokenValid) {
          this.setState({octokit: octokit})
        }
    }
    if(!newSettings.githubTokenValid) {
      newSettings.poolingSpeed = 60 * 1000
    }
    this.setState({settings: newSettings})
  }

  getMissRate(): number {
    const history = this.state.missRateHistory;
    if(history.length === 0) return -1
    const average = Number(history.reduce((a,b) => a + b, 0)) / history.length;
    return average
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
              onMissRateClear={this.onMissRateClear}
              onSettingsUpdate={this.onSettingsUpdate}
            ></EventList>
        </Container>
      );
    }
}
