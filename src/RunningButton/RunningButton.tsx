import './RunningButton.scss'
import React from "react"
import { Button, Spinner } from "react-bootstrap";
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { FeedStatus } from '../EventFeed/EventFeed';

export interface IProps {
    onClick: (e: React.MouseEvent<HTMLElement>) => void,
    running: boolean,
    status: FeedStatus,
    showSpinner: boolean
}

export default class RunningButton extends React.Component<IProps> {
    render() {
        return (
            <div className="d-flex justify-content-end align-items-center mt-3">
                <span className="text-muted me-2">
                    {this.props.showSpinner ? (<Spinner animation='border' size='sm' />) : ""} {this.props.status}
                </span>
                <Button 
                    className="float-right"
                    size="sm"
                    style={{width: 42, height: 42}}
                    variant={this.props.running ? "success" : "danger"}
                    onClick={this.props.onClick}
                >
                    {this.props.running ? <BsPauseFill size={24}/> : <BsPlayFill size={24}/>}
                </Button>
            </div>
        )
    }
}