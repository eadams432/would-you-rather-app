import { _saveQuestion, _saveQuestionAnswer } from "../Utils/_DATA";
import { userAddQuestion } from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const VOTE_FOR_QUESTION = 'VOTE_FOR_QUESTION';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function voteForQuestion(userId, questionId, option) {
    return {
        type: VOTE_FOR_QUESTION,
        userId,
        questionId,
        option
    }
}

export function handleVoteForQuestion(userId, questionId, option){
    return (dispatch) =>{
        return _saveQuestionAnswer({authedUser: userId, qid: questionId, answer: option}).then(
            dispatch(voteForQuestion(userId,questionId, option))
        ).catch((err)=>{
            alert('error saving answer, please try again')
        });
    }
}

function addNewQuestion(question) {
    return {
        type: ADD_NEW_QUESTION,
        question
    }
}

export function handleAddNewQuestion(optionOne, optionTwo, userId) {
    const question = {
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: userId
    }
    return (dispatch) => {
        return _saveQuestion(question)
            .then((formattedQuestion) => {
                dispatch(addNewQuestion(formattedQuestion));
                dispatch(userAddQuestion(userId, formattedQuestion.questionId));
            })
            .catch((err) => {
                alert('error saving question, please try again')
            })
    }
}