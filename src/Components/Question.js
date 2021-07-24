import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import QuestionVote from './QuestionVote';
import QuestionPreview from './QuestionPreview';

class Question extends Component {
    render() {
        if (!this.props.authedUser) {
            return <Redirect to='/login' />
        }

        const optionOne = this.props.question.optionOne;
        const optionTwo = this.props.question.optionTwo;

        optionOne.answered = optionOne.votes.indexOf(this.props.authedUser) > -1 ? true : false;
        optionTwo.answered = optionTwo.votes.indexOf(this.props.authedUser) > -1 ? true : false;
        //const isDisabled = (optionOne.answered || optionTwo.answered)
        const questionVersion = this.props.mode === 'preview' ? 
                        <QuestionPreview text={optionOne.text} id={this.props.question.id} isAnswered={this.props.isAnswered}/>
                        :
                        <QuestionVote id={this.props.question.id} />
        return (
            <Card>
                <Card.Header>{this.props.author.id === this.props.authedUser ? 'You ask:' : this.props.author.name + ' asks:'}</Card.Header>
                <Card.Body>
                    <Card.Title>Would you rather ...</Card.Title>
                    <Row>
                        <Col xs={3}>Image</Col>
                        <Col>
                            {questionVersion}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

function mapStateToProps(state, props) {
    let questionId = '';
    if (props.mode === 'preview') {
        questionId = props.id;
    } else {
        questionId= props.match.params.id;
    }
    return {
        question: state.questions[questionId],
        authedUser: state.authedUser,
        mode: props.mode,
        author: {
            name: state.users[state.questions[questionId].author].name,
            id: state.questions[questionId].author
        },
        isAnswered: props.isAnswered
    }
}

const connectedQuestion = connect(mapStateToProps)(Question);
export default connectedQuestion;