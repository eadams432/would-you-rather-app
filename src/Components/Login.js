import React, { Component } from 'react';
import { Dropdown, Row, Button, Container, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAuthedUser } from '../Actions/authedUser';

class Login extends Component {

    state = {
        selectedUser: '',
        toHomePage: false
    }

    handleLoginSubmit = () => {
        this.props.dispatch(handleAuthedUser(this.state.selectedUser));
        this.setState({
            toHomePage: true
        })
    }

    handleLoginUserSelect = (eventKey, event) => {
        this.setState({
            selectedUser: eventKey
        })
    }

    render() {
        const users = this.props.users;
        if (this.state.toHomePage){
            return <Redirect to='/' />
        }
        return (
            <Container>
                <Row align='center'>
                    <Card>
                        <Card.Title>Please log in!</Card.Title>
                        <Card.Body>
                            <Dropdown>
                                <Dropdown.Toggle variant='success' id='login-dropdown'>
                                    Select User
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {Object.entries(users).map(([id, user]) => {
                                        return <Dropdown.Item active={this.state.selectedUser === id ? true : false} onSelect={(eventKey, event) => { this.handleLoginUserSelect(eventKey, event) }} eventKey={id} key={id}>{user.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                            {this.state.selectedUser && (
                                     <div>
                                     {this.state.selectedUser && (
                                         <span>{users[this.state.selectedUser].name}</span>
                                     )}
                                 </div>
                            )}
                           
                        </Card.Body>
                    </Card>
                    
                </Row>
                <Row>
                  
                </Row>
                <Row>
                    <Button onClick={this.handleLoginSubmit}>Login</Button>
                </Row>
            </Container>

        );
    }
}

const connectedLogin = connect(({users})=>({users}))(Login)
export default connectedLogin;


