import React from 'react';
import { Container } from 'react-bootstrap';
import EventList from '../EventsList/EventList';
import { Octokit } from '@octokit/rest';
import FeedSettings from '../FeedSettings/FeedSettings'
import EventType from '../utils/eventType';

export interface IFeedSettings{
  poolingSpeed: number
  githubToken: string
  filter: Array<EventType>
  running: boolean
  githubTokenValid: boolean,
}

export enum FeedStatus {
  STARTING = "starting",
  PAUSED = "paused",
  RUNNING = "running",
  FETCHING = "fetching",
  NO_NEW_EVENTS = "no new events"
}


export interface IState{
  octokit: Octokit,
  missRateHistory: Array<number>
  settings: IFeedSettings,
  status: FeedStatus
}

export default class EventFeed extends React.Component {
  state: IState = {
    octokit: this.newOctokit(),
    missRateHistory: [],
    settings: {
      poolingSpeed: 60 * 1000,
      githubToken: "",
      githubTokenValid: false,
      filter: ["PUSH" as EventType],
      running: true
    },
    status: FeedStatus.STARTING
  }

  constructor(props) {
    super(props);
    this.onMissRateUpdate = this.onMissRateUpdate.bind(this)
    this.onSettingsUpdate = this.onSettingsUpdate.bind(this)
    this.onMissRateClear = this.onMissRateClear.bind(this)
    this.onStatusUpdate = this.onStatusUpdate.bind(this)
  }

  newOctokit(auth?: string) {
    return new Octokit({
      request: {
        // A small hack to don't cache any octokit calls
        fetch: (input, init) => fetch(input, {...init, cache: 'no-cache'})
      },
      auth: auth
    })
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
    const newState: IState = Object.assign({}, this.state)
    if(this.state.settings.githubToken !== newSettings.githubToken) {
      const octokit = this.newOctokit(newSettings.githubToken);
      await octokit.rateLimit.get()
        .then((resp) => {
          const valid = resp.data.resources.core.limit > 1000
          newSettings.githubTokenValid = valid
        }).catch(() => {
          newSettings.githubTokenValid = false
        })
        if(newSettings.githubTokenValid) {
          newState.octokit = octokit
        }
    }
    if(!newSettings.githubTokenValid) {
      newSettings.poolingSpeed = 60 * 1000
    }

    if(!newSettings.running) {
      newState.status = FeedStatus.PAUSED
    }
    newState.settings = newSettings
    this.setState(newState)
  }

  onStatusUpdate(newStatus: FeedStatus) {
    if(!this.state.settings.running && this.state.status === FeedStatus.PAUSED) return;
    this.setState({status: newStatus})
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
              status={this.state.status}
              onSettingsUpdate={this.onSettingsUpdate}
            />
            <EventList 
              octokit={this.state.octokit}
              settings={this.state.settings}
              onMissRateUpdate={this.onMissRateUpdate}
              onMissRateClear={this.onMissRateClear}
              onSettingsUpdate={this.onSettingsUpdate}
              onStatusUpdate={this.onStatusUpdate}
            ></EventList>
        </Container>
      );
    }
}
