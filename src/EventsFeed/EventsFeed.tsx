import "./EventFeed.scss"
import React from 'react';
import Event from '../Event/Event';
import { Octokit } from '@octokit/rest';
import FlipMove from "react-flip-move";
import { delay } from "../utils/utils";
import { eventInfo, IEventInfo } from "../utils/events";
import EventType from "../utils/eventType";
export interface IState{
  events: Array<IEventInfo>,
  animationDuration: number
}

export interface IProps {
  octokit: Octokit,
  onMissRateUpdate: (num: number) => void;
}

export default class EventsFeed extends React.Component<IProps> {
  state: IState = {
    events: [],
    animationDuration: 100
  }
  running: boolean = true;

  async componentDidMount() {
    let lastEventId = 0;
    const poolingDelay = 10 * 1000;
    while(this.running) {
      const rawEvents = (await this.props.octokit.activity.listPublicEvents({per_page: 100})).data
      let events = rawEvents.map((e) => eventInfo(e)).filter((e) => !!e) as IEventInfo[];

      // Calculate missed events rate
      const eventId = Number(events[events.length - 1]?.event.id);
      if (lastEventId > 0) {
        const eventsMissed = (eventId - lastEventId)
        this.props.onMissRateUpdate(100 / (eventsMissed + 100))
      }
      lastEventId = eventId;

      // Filter Events and remove duplicates
      events = events.filter((e) => this.filterEvent(e))
      events = events.filter((v,i,a)=>a.findIndex(t=>(t.event.id === v.event.id))===i)

      // Slowly push all events
      if(events.length === 0) {
        console.log(`No new events with specified filter! Waiting for: ${poolingDelay / 1000} seconds!`)
        await delay(poolingDelay)
      }
      for await(const e of events) {
        if(!this.running) break;
        const newElements = this.state.events.slice()
        newElements.unshift(e)
        if(newElements.length > 100) {
          newElements.pop()
        }
        const delayLen = poolingDelay / events.length
        this.setState({events: newElements, animationDuration: Math.min(delayLen - 10, 250)});
        await delay(delayLen)
      }
    }
  }

  componentWillUnmount() {
    this.running = false;
  }

  filterEvent(event: IEventInfo): boolean {
    return [EventType.ISSUE].includes(event.type)
  }

  render() {
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
  }
}
