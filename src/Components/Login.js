import React, { Component } from 'react';
import { Dropdown, Row, Button, Container, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAuthedUser } from '../Actions/authedUser';

class Login extends Component {

    state = {
        selectedUser: '',
        toHomePage: false,
        toLocation: ''
    }

    handleLoginSubmit = (from) => {
        const routeTo = from ? from : '/'
        this.props.dispatch(handleAuthedUser(this.state.selectedUser));
        this.setState({
            toLocation: routeTo
        })
    }

    handleLoginUserSelect = (eventKey, event) => {
        this.setState({
            selectedUser: eventKey
        })
    }

    render() {
        const users = this.props.users;
        const fromLocation = this.props.location.state ? this.props.location.state.from : null;

        if (this.state.toLocation){
            return <Redirect to={this.state.toLocation} />
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
                    <Button onClick={()=>this.handleLoginSubmit(fromLocation)}>Login</Button>
                </Row>
            </Container>

        );
    }
}

function mapStateToProps(state, props){
    return {
        users: state.users,
        location: props.location
    }
}

const connectedLogin = connect(mapStateToProps)(Login)
export default connectedLogin;


