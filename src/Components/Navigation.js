import React, { Component } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {

    state = {
        navItem: '/'
    }

    handleNavClick = (selection) => {
        this.setState({
            navItem: selection
        });
    }

    render() {
        console.log(this.props.user);
        const userName = this.props.user ? this.props.userList[this.props.user].name : '';
        return (
            <Navbar>
                <Nav variant="pills"
                    className='container-fluid'
                    activeKey={this.state.navItem}
                    onSelect={(selectedKey) => this.handleNavClick(selectedKey)}>
                    <Nav.Item>
                        <Nav.Link as={Link} to='/' eventKey="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to='/new' eventKey="/create">Create Poll</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to='/leaderboard' eventKey="/leaderboard">Leaderboard</Nav.Link>
                    </Nav.Item>
                    {userName && (
                        <Navbar.Text className='ms-auto'>
                            Logged in as {userName}
                        </Navbar.Text>
                    )}

                    <Nav.Item className='ms-auto'>
                        <Nav.Link as={Link} to='/logout' eventKey="/logout">Log out</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        );
    }

}

function mapStateToProps(state, props){
    return {
        userList: state.users,
        user: state.authedUser
    }
}

export default connect(mapStateToProps)(Navigation);