import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddNewQuestion} from '../Actions/questions'

class CreatePoll extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        new Promise((res,rej)=>{
            this.props.dispatch(handleAddNewQuestion(this.state.optionOne, this.state.optionTwo, this.props.authedUser));
            res();
        });
        this.setState({
            toHome: true
        })
    }

    handleInputChange = (event, option) => {
        const value = event.target.value;
        this.setState({
            [option]: value
        });
    }

    render() {

        if (!this.props.authedUser) {
            return <Redirect to={{ pathname: '/login', state: { from: this.props.location.pathname } }} />
        }

        if (this.state.toHome) {
            return <Redirect to='/' />
        }

        const disabled = this.state.optionOne && this.state.optionTwo ? false : true;

        return (

            <Form onSubmit={this.handleFormSubmit}>
                <h3>Would you rather...</h3>
                <Form.Group controlId="formOptionOne">
                    <Form.Control onChange={(event) => this.handleInputChange(event, 'optionOne')} type="text" placeholder='Option one' value={this.state.optionOne} />
                </Form.Group>

                <span>OR</span>

                <Form.Group controlId="formOptionTwo">
                    <Form.Control onChange={(event) => this.handleInputChange(event, 'optionTwo')} type="text" placeholder='Option two' value={this.state.optionTwo} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={disabled}>
                    Submit
                </Button>
            </Form>
        );
    }
}

export default connect((state)=>({authedUser: state.authedUser}))(CreatePoll);