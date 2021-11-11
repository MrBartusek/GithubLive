import "./FeedSettings.scss"
import React from 'react';

export interface IProps {
  missRate: string,
}

export default class FeedSettings extends React.Component<IProps> {
  render() {
    return (
      <div className="settings">
        This feed display only around <b>{this.props.missRate}</b> of the total Github activity.
      </div>
    );
  }
}
