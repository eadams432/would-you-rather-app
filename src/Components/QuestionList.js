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
        const tempArray = Object.entries(filteredQuestions); 
        let sortedArray = [];
        for (let i=0; i<filteredQuestions.length; i++){
            sortedArray.push(filteredQuestions[i][1])
        }
        sortedArray.sort((a, b)=>{return b.timestamp - a.timestamp});
        return sortedArray;
    }

    render() {
        if (!this.props.authedUser) {
            return <Redirect to='/login' />
        }
        const filteredQuestions = this.filterQuestions(this.props.isAnswered)
        return (
            filteredQuestions.map((question) => {
                return <Question key={question.id} id={question.id} mode={'preview'} isAnswered={this.props.isAnswered}/>
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