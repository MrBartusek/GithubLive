import React from 'react';
import './Event.scss'
import { Image } from 'react-bootstrap';
import { Endpoints } from '@octokit/types'
import eventInfo from '../utils/events';
import { actorURL } from '../utils/actor';

export interface IProps{
  event: Endpoints["GET /events"]["response"]["data"][0]
}

export default class Event extends React.Component<IProps> {
  render() {
    const info = eventInfo(this.props.event)
    if(info === null) return ""
    return (
      <div className="event">
        {info.badge}
        <div className="mt-3 d-flex">
          <div className="me-4 d-flex flex-column">
            <a href={actorURL(this.props.event.actor)}>
              <Image height="80px" style={{minHeight: "80px"}} src={this.props.event.actor.avatar_url} rounded />
            </a>
            <small className="text-center mt-1">5 minutes ago</small>
          </div>
          <div>
            {info.header}
          </div>
        </div>
      </div>
    );
  }
}
