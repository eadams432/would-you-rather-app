import React, { Component } from 'react'
import { Row, Button, Form , Badge, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleVoteForQuestion } from '../Actions/questions';
import { Redirect } from 'react-router-dom';
import { handleUserVote } from '../Actions/users';

class QuestionVote extends Component {

    state = {
        selectedOption: '',
        toHome: false
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        new Promise ((res,rej)=>{
            this.props.dispatch(handleVoteForQuestion(this.props.authedUser, this.props.id, this.state.selectedOption));
            res();
        }).then(
            this.props.dispatch(handleUserVote(this.props.authedUser, this.props.id, this.state.selectedOption))
        );
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

        const badgeTextOne = optionOne.answered ? 'Your vote' : '';
        const badgeTextTwo = optionTwo.answered ? 'Your vote' : '';

        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Row className={ optionOne.answered ? 'voted-option' : ''}>
                    <Col>
                        <Form.Check
                                type='radio'
                                id='optionOne'
                                disabled={isDisabled}
                                checked={this.state.selectedOption === 'optionOne'}
                                label={this.props.question.optionOne.text}
                                onChange={this.handleRadioChange} 
                                />
                    </Col>
                    <Col>
                        <Badge className='voted-badge'>{badgeTextOne}</Badge>
                    </Col>
                </Row>
                <Row className={ optionTwo.answered ? 'voted-option' : ''}>
                    <Col>
                        <Form.Check
                            type='radio'
                            id='optionTwo'
                            disabled={isDisabled}
                            checked={this.state.selectedOption === 'optionTwo'}
                            label={this.props.question.optionTwo.text}
                            onChange={this.handleRadioChange} 
                            />
                    </Col>
                    <Col>
                        <Badge className='voted-badge'>{badgeTextTwo}</Badge>
                    </Col>
                </Row>
                <Row>
                    <Button
                        className='vote-button'
                        type='submit'
                        disabled={isDisabled || !this.state.selectedOption}>
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