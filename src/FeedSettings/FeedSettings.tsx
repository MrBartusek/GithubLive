import "./FeedSettings.scss"
import React from 'react';
import { IFeedSettings } from "../EventFeed/EventFeed";
import { Alert} from 'react-bootstrap'
import Select from 'react-select'
import EventType from "../utils/eventType";
import { Container, Row, Col, Form} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import FeedStatistics from '../FeedStatistics/FeedStatistics'
import RunningButton from "../RunningButton/RunningButton";

export interface IProps {
  settings: IFeedSettings,
  missRate: number
  onSettingsUpdate: (settings: IFeedSettings) => void;
}

export default class FeedSettings extends React.Component<IProps> {
  constructor(props) {
    super(props)
    this.handleRunningClick = this.handleRunningClick.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handlePoolingChange = this.handlePoolingChange.bind(this)
    this.handleTokenChange = this.handleTokenChange.bind(this)
  }

  render() {
    const settings = this.props.settings
    return (
      <Container className="settings">
        <h3 className="mb-4">Settings</h3>
        <Row xs={1} md={2}>
          <Col className="col-md-6">
            <Form.Label>
              Github Personal Token {' - '}
              <a href="https://github.com/settings/tokens/new?description=GithubLIVE" target="_blank" rel="noreferrer">
                generate new token
              </a>
            </Form.Label>
            <Form.Control 
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              isInvalid={settings.githubToken !== "" && !settings.githubTokenValid}
              isValid={settings.githubToken !== "" && settings.githubTokenValid}
              onChange={this.handleTokenChange}
            />
            <Form.Text className="text-muted">
              Providing authentication token is not required but highly recommended.
            </Form.Text>
          </Col>
          <Col className="col-md-6">
            <Form.Label>Pooling speed</Form.Label>
            <div className="d-flex align-items-center">
              <span>Fast</span>
              <RangeSlider
                min={15} 
                max={100}
                step={5}
                disabled={!settings.githubTokenValid}
                value={settings.poolingSpeed / 1000}
                onChange={this.handlePoolingChange}
              />
              <span>Slow</span>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="col-md-12">
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
        <Row className="mt-3">
          <Col className="col-md-12">
            <FeedStatistics missRate={this.props.missRate} poolingSpeed={settings.poolingSpeed} />
          </Col>
        </Row>
        <RunningButton running={settings.running} onClick={this.handleRunningClick} />
      </Container>
    );
  }

  handleFilterChange(selectedOption) {
    const settings = Object.assign({}, this.props.settings);
    settings.filter = selectedOption.map(x => x.value)
    this.props.onSettingsUpdate(settings)
  };

  handlePoolingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const settings = Object.assign({}, this.props.settings);
    settings.poolingSpeed = e.target.valueAsNumber * 1000
    this.props.onSettingsUpdate(settings)
  }

  handleTokenChange(e: React.ChangeEvent<HTMLInputElement>) {
    const settings = Object.assign({}, this.props.settings);
    settings.githubToken = e.target.value
    this.props.onSettingsUpdate(settings)
  }

  handleRunningClick(e: React.MouseEvent<HTMLElement>) {
    const settings = Object.assign({}, this.props.settings);
    settings.running = !settings.running;
    this.props.onSettingsUpdate(settings)
  }
}
