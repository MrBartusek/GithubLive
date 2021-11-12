import "./FeedSettings.scss"
import React from 'react';
import { IFeedSettings } from "../EventFeed/EventFeed";
import { Button } from 'react-bootstrap'
import { BsPauseFill, BsPlayFill, BsInfoSquare} from 'react-icons/bs'
import Select from 'react-select'
import EventType from "../utils/eventType";
import { Container, Row, Col, Form } from "react-bootstrap";

export interface IProps {
  settings: IFeedSettings,
  missRate: string,
  onSettingsUpdate: (settings: IFeedSettings) => void;
}

export default class FeedSettings extends React.Component<IProps> {
  constructor(props) {
    super(props)
    this.handleRunningClick = this.handleRunningClick.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  render() {
    const settings = this.props.settings
    const missRate = this.props.missRate
    return (
      <Container className="settings">
        <h3 className="mb-4">Settings</h3>
        <Row>
          <Col>pat</Col>
          <Col>pooling rate</Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Events to exclude</Form.Label>
            <Select
              options={
                Object.entries(EventType)
                  .filter(([t, s]) => s !== EventType.OTHER)
                  .map(([t, s]) => ({value: t as EventType, label: s as string}))
                }
              value={settings.filter.map((v) => ({value: v, label: EventType[v]}))}
              isMulti={true}
              onChange={this.handleFilterChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <BsInfoSquare size={19} /> Using the current pooling rate, this feed display only around <b>{missRate}</b> of the total Github activity.
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-3">
          <Button 
            className="float-right"
            size="sm"
            style={{width: 42, height: 42}}
            variant={settings.running ? "success" : "danger"}
            onClick={this.handleRunningClick}>
              {settings.running ? <BsPauseFill size={24}/> : <BsPlayFill size={24}/>}
            </Button>
        </div>
      </Container>
    );
  }

  handleFilterChange = (selectedOption) => {
    const settings = Object.assign({}, this.props.settings);
    settings.filter = selectedOption.map(x => x.value)
    this.props.onSettingsUpdate(settings)
  };

  handleRunningClick(e: React.MouseEvent<HTMLElement>) {
    const settings = Object.assign({}, this.props.settings);
    settings.running = !settings.running;
    this.props.onSettingsUpdate(settings)
  }
}
