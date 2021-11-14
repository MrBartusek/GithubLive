import "./EventList.scss"
import React, { Fragment } from 'react';
import Event from '../Event/Event';
import { Octokit } from '@octokit/rest';
import FlipMove from "react-flip-move";
import { delay } from "../utils/utils";
import { eventInfo, IEventInfo } from "../utils/events";
import { IFeedSettings } from '../EventFeed/EventFeed'
import EventType from "../utils/eventType";
import { Button } from "react-bootstrap"

export interface IState{
  events: Array<IEventInfo>,
  animationDuration: number
}

export interface IProps {
  octokit: Octokit,
  settings: IFeedSettings,
  onMissRateUpdate: (num: number) => void,
  onMissRateClear: () => void,
  onSettingsUpdate: (settings: IFeedSettings) => void,
}

export default class EventList extends React.Component<IProps> {
  state: IState = {
    events: [],
    animationDuration: 100
  }
  abortController: AbortController = new AbortController()
  constructor(props) {
    super(props)
    this.onResetFilters = this.onResetFilters.bind(this)
  }

  async componentDidMount() {
    if(this.props.settings.running) {
      return await this.updateFeed(this.abortController)
    }
  }

  async componentDidUpdate(prevProps: IProps) {
    const prevSettings = prevProps.settings
    const settings = this.props.settings
    if (prevSettings.running !== settings.running) {
      if(settings.running) {
        this.abortController = new AbortController()
        return await this.updateFeed(this.abortController)
      }
      else {
        this.abortController.abort()
      }
    }
    if(prevSettings.filter !== settings.filter) {
      this.setState({events: []})
      if(settings.running) {
        this.abortController.abort()
        this.abortController = new AbortController()
        return await this.updateFeed(this.abortController)
      }
    }

    if(prevSettings.poolingSpeed !== settings.poolingSpeed) {
      this.props.onMissRateClear()
    }
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  async updateFeed(abortController: AbortController): Promise<void> {
    const settings = this.props.settings
    let lastEventId = 0;
  
    while(!abortController.signal.aborted) {
      const initialPoolingSpeed = this.props.settings.poolingSpeed;
      const rawEvents = (await this.props.octokit.activity.listPublicEvents({
        per_page: 100
      })).data
      let events = rawEvents.map((e) => eventInfo(e)).filter((e) => !!e) as IEventInfo[];

      // Calculate missed events rate
      const eventId = Number(events[events.length - 1]?.event.id);
      if (lastEventId > 0) {
        const eventsMissed = (eventId - lastEventId)
        if(eventsMissed !== 0) {
          this.props.onMissRateUpdate(100 / (eventsMissed + 100))
        }
      }
      lastEventId = eventId;

      // Filter events
      events = events.filter((e) => !settings.filter.includes(Object.keys(EventType)[Object.values(EventType).indexOf(e.type)] as any))
      // Remove duplicates
      events = events.filter((e) => this.state.events.findIndex(x => x.event.id === e.event.id) === -1)

      // Slowly push all events
      if(events.length === 0) {
        console.log(`No new events with specified filter! Waiting for: ${this.props.settings.poolingSpeed / 1000} seconds!`)
        await delay(this.props.settings.poolingSpeed)
      }
      for await(const e of events) {
        if(abortController.signal.aborted) break;
        const newElements = this.state.events.slice()
        newElements.unshift(e)
        if(newElements.length > 100) {
          newElements.pop()
        }
        if(this.props.settings.poolingSpeed !== initialPoolingSpeed) {
          // Pooling speed was changed during processing so the miss rate
          // shouldn't be calculated
          lastEventId = 0
        }

        const delayLen = this.props.settings.poolingSpeed / events.length
        this.setState({events: newElements, animationDuration: Math.min(delayLen - 10, 250)});
        await delay(delayLen)
      }
    }
  }

  onResetFilters(event: React.MouseEvent<HTMLElement>) {
    const settings = Object.assign({}, this.props.settings);
    settings.filter = ["PUSH" as EventType] as Array<EventType>
    this.props.onSettingsUpdate(settings)
  }

  render() {
    if(this.state.events.length > 0) {
      return (
        <FlipMove 
          enterAnimation='none'
          duration={this.state.animationDuration < 240 ? 0 : this.state.animationDuration}
        >
          {this.state.events.map((eventInfo) => (
            <Event key={eventInfo.event.id} eventInfo={eventInfo}></Event>
          ))}
        </FlipMove>
      );
    } else {
      const totalFilters = Object.values(EventType).length - 1
      const selectedFilters = this.props.settings.filter.length
      return (
        <p className="lead text-center" style={{marginTop: '100px'}}>
          {selectedFilters >= totalFilters ? 
            "You have excluded all of the events. " : "Waiting for new events... "
          }
          {selectedFilters > 12 ? 
            <Fragment>
              <span>You can try to </span>
              <Button
                variant="link"
                className="p-0"
                onClick={this.onResetFilters}
                style={{fontSize:"1.25rem", fontWeight: 300, verticalAlign: 'baseline'}}
              >
                  reset your filters
              </Button>.
            </Fragment> : ""}
        </p>
      )
    }
  }
}
