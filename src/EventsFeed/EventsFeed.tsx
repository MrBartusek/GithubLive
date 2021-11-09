import React from 'react';
import Event from '../Event/Event';
import { Endpoints } from '@octokit/types'
import { Octokit } from '@octokit/rest';

export interface IState{
  events: Endpoints["GET /events"]["response"]["data"]
}

export interface IProps {
  octokit: Octokit
}


export default class EventsFeed extends React.Component<IProps> {
  state: IState = {
    events: []
  }

  async componentDidMount() {
    const events = await this.props.octokit.activity.listPublicEvents({
      per_page: 100
    })
    this.setState({ events: events.data });
  }

  render() {
    let result: Array<JSX.Element> = [];
    for(const event of this.state.events) {
      if(event.type == null) throw Error("Event type is null")
      result.push(<Event key={event.id} event={event}></Event>)
    }
    return result;
  }
}
