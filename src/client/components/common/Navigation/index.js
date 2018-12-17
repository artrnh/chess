import React, { Component } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class Navigation extends Component {
  state = { opened: false };

  toggle = () => this.setState(({ opened }) => ({ opened: !opened }));

  render() {
    const { opened } = this.state;

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Chess</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={opened} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/artrnh/chess">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
