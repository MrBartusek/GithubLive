import React from 'react';
import { Container, Navbar } from 'react-bootstrap'

export default class AppNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>GithubLIVE</Navbar.Brand>
        </Container>
      </Navbar>
      );
    }
}
