import React from "react"
import { Alert, Spinner } from "react-bootstrap";

export interface IProps {
    missRate: number,
    poolingSpeed: number,
}

export default class FeedStatistics extends React.Component<IProps> {
    render() {
        const missRate = this.props.missRate
        const eventsPerSecond = 60 / (this.props.poolingSpeed / 1000) * 100;
        const totalEventsPerSecond = eventsPerSecond / missRate
        return (
            <Alert variant='secondary'>
              {missRate > 0 ? (<>
                Using the current pooling speed, this feed display only around {' '}
                <b>{Math.round((missRate * 100) * 10) / 10}%</b> {' '}
                of the total Github activity. That's {' '}
                <b>{Math.round(eventsPerSecond)} events per minute</b> {' '}
                out of total of around {' '}
                <b>{Math.round(Math.ceil(totalEventsPerSecond / 100) * 100)} events per minute</b>! {' '}
              </>) : (<><Spinner animation="border" size='sm' /> <span>Calculating statistics...</span></>)}
            </Alert>
        )
    }
}