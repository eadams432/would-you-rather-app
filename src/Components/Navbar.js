import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    state = {
        navItem: '/'
    }

    handleNavClick = (selection) =>{
        this.setState({
            navItem: selection
        });
    }

    render() {
        return (
            <Nav variant="pills"
                activeKey={this.state.navItem}
                onSelect={(selectedKey) => this.handleNavClick(selectedKey)}
            >
                <Nav.Item>
                    <Nav.Link as={Link} to='/' eventKey="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/new' eventKey="/create">Create Poll</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/leaderboard' eventKey="/leaderboard">Leaderboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/logout' eventKey="/logout">Log out</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }

}

export default Navbar;