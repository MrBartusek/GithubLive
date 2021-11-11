import React from 'react';
import './Event.scss'
import EventBadge from '../EventBadge/EventBadge'
import { Image } from 'react-bootstrap';
import { IEventInfo } from '../utils/events';
import { actorURL } from '../utils/actor';

export interface IProps{
  eventInfo: IEventInfo
}

export default class Event extends React.Component<IProps> {
  render() {
    const event = this.props.eventInfo;
    if(event === null) return ""
    return (
      <div className="event">
        <EventBadge
            color={event.color}
            icon={event.icon}
            content={event.type}
          />
        <div className="mt-3 d-flex">
          <div className="me-4 d-flex flex-column">
            <a href={actorURL(event.event.actor)}>
              <Image height="80px" style={{minHeight: "80px"}} src={event.event.actor.avatar_url + "?size=80"} rounded />
            </a>
            <small className="text-center mt-1">5 minutes ago</small>
          </div>
          <div>
            {event.header}
          </div>
        </div>
      </div>
    );
  }
}
