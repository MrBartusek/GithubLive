import "./EventFeed.scss"
import React from 'react';
import Event from '../Event/Event';
import { Endpoints } from '@octokit/types'
import { Octokit } from '@octokit/rest';
import FlipMove from "react-flip-move";
import { delay } from "../utils/utils";

export interface IState{
  events: Endpoints["GET /events"]["response"]["data"],
  animationDuration: number
}

export interface IProps {
  octokit: Octokit
}

export default class EventsFeed extends React.Component<IProps> {
  state: IState = {
    events: [],
    animationDuration: 100
  }

  async componentDidMount() {
    let lastEventId = 0;
    const poolingDelay = 30 * 1000;
    while(true) {
      let events = (await this.props.octokit.activity.listPublicEvents({per_page: 100})).data

      // Calculate missed events rate
      let missedEventsRate = -1;
      const eventId = Number(events[events.length - 1].id);
      if (lastEventId > 0) {
        const eventsMissed = (eventId - lastEventId)
        const rate = 100 / (eventsMissed + 100)
        missedEventsRate = Math.round(rate * 100) / 100
      }
      lastEventId = eventId;
      console.log(missedEventsRate)

      // Filter Events
      events = events.filter((x) => this.filterEvent(x))

      // Slowly push all events
      for await(const e of events) {
        const newElements = this.state.events.slice()
        newElements.unshift(e)
        const delayLen = poolingDelay / events.length
        this.setState({events: newElements, animationDuration: Math.min(delayLen - 10, 250)});
        await delay(delayLen)
      }
    }
  }

  filterEvent(event: Endpoints["GET /events"]["response"]["data"][0]): boolean {
    return event.type !== "PushEvent"
  }

  render() {
    return (
      <FlipMove 
        enterAnimation='none'
        duration={this.state.animationDuration < 200 ? 0 : this.state.animationDuration}
      >
        {this.state.events.map((event) => (
          <Event key={event.id} event={event}></Event>
        ))}
      </FlipMove>
    );
  }
}
