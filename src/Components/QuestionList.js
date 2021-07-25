import React, { Component } from 'react';
import Question from './Question';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class QuestionList extends Component {

    filterQuestions = (showAnswered) => {
 
        const filteredQuestions = Object.entries(this.props.questions).filter(([key, value]) => {
            const question = value;
            const optionOne = question.optionOne;
            const optionTwo = question.optionTwo;

            question.isAnswered = (optionOne.votes.indexOf(this.props.authedUser) > -1 || optionTwo.votes.indexOf(this.props.authedUser) > -1);

            if (question.isAnswered && showAnswered) {
                return true;
            }

            if (!question.isAnswered && !showAnswered) {
                return true;
            }
            return false;
        });
        return filteredQuestions;
    }

    //Todo: order questions by most recent

    render() {
        if (!this.props.authedUser) {
            return <Redirect to='/login' />
        }
        const filteredQuestions = this.filterQuestions(this.props.isAnswered)
        return (
            filteredQuestions.map(([key, value]) => {
                return <Question key={key} id={value.id} mode={'preview'} isAnswered={this.props.isAnswered}/>
            })
        );
    }
}

function mapStateToProps(state, props) {
    return {
        questions: state.questions,
        authedUser: state.authedUser,
        isAnswered: props.answered
    }
}

const connectedQuestion = connect(mapStateToProps)(QuestionList);
export default connectedQuestion;