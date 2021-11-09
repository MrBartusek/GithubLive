import React from 'react';
import { Badge } from 'react-bootstrap';
import { IconType } from 'react-icons/lib';

export interface IProps {
  icon: IconType,
  content?: string,
  color?: string,
}

export default class EventBadge extends React.Component<IProps> {
  render() {
    const Icon = this.props.icon
    return (
      <Badge pill 
        style={{fontSize: 14}}
        // This abomination is needed for marking background-color as important
        // Thanks, React...
        ref={(el) => el && el.style.setProperty("background-color", this.props.color, "important")}
      >
        <Icon size={18}></Icon> {this.props.content}
      </Badge>
    );
  }
}
