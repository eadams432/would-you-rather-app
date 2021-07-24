import React, { Component } from 'react'
import { Row, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { voteForQuestion } from '../Actions/questions';
import { Redirect } from 'react-router-dom';

class QuestionVote extends Component {

    state = {
        selectedOption: '',
        toHome: false
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(voteForQuestion(this.props.authedUser, this.props.id, this.state.selectedOption));
        this.setState({
            toHome: true
        });
    }

    handleRadioChange = (event) => {
        this.setState({
            selectedOption: event.target.id
        });
    }

    render() {
        if (this.state.toHome){
            return <Redirect to={'/'}/>
        }
        const optionOne = this.props.question.optionOne;
        const optionTwo = this.props.question.optionTwo;

        optionOne.answered = optionOne.votes.indexOf(this.props.authedUser) > -1 ? true : false;
        optionTwo.answered = optionTwo.votes.indexOf(this.props.authedUser) > -1 ? true : false;
        const isDisabled = (optionOne.answered || optionTwo.answered);
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <div>
                    <Form.Check
                        type='radio'
                        id='optionOne'
                        disabled={isDisabled}
                        checked={this.state.selectedOption === 'optionOne'}
                        label={this.props.question.optionOne.text}
                        onChange={this.handleRadioChange} />

                    <Form.Check
                        type='radio'
                        id='optionTwo'
                        disabled={isDisabled}
                        checked={this.state.selectedOption === 'optionTwo'}
                        label={this.props.question.optionTwo.text}
                        onChange={this.handleRadioChange} />
                </div>
                <Row>
                    <Button
                        type='submit'
                        disabled={isDisabled}>
                        Submit
                    </Button>
                </Row>
            </Form>
        );
    }
}

function mapStateToProps(state, props) {
    const questionId = props.id;
    return {
        question: state.questions[questionId],
        authedUser: state.authedUser,
    }
}

export default connect(mapStateToProps)(QuestionVote)