import { _saveQuestion } from "../Utils/_DATA";

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
                dispatch(addNewQuestion(formattedQuestion))
                //Todo: need to also update the users!
            })
            .catch((err) => {
                alert('error saving question, please try again')
            })
    }
}