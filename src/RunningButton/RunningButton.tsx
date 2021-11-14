import './RunningButton.scss'
import React from "react"
import { Button } from "react-bootstrap";
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

export interface IProps {
    onClick: (e: React.MouseEvent<HTMLElement>) => void,
    running: boolean
}

export default class RunningButton extends React.Component<IProps> {
    render() {
        return (
            <div className="d-flex justify-content-end mt-3">
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