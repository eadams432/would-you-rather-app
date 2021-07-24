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

    handleFormSubmit = async (event) => {
        event.preventDefault();
        await this.props.dispatch(handleAddNewQuestion(this.state.optionOne, this.state.optionTwo, this.props.authedUser));
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
            return <Redirect to='/login' />
        }

        if (this.state.toHome) {
            return <Redirect to='/' />
        }

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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default connect((state)=>({authedUser: state.authedUser}))(CreatePoll);