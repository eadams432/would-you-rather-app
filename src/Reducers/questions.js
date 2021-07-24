import { RECEIVE_QUESTIONS, VOTE_FOR_QUESTION, ADD_NEW_QUESTION } from "../Actions/questions";

export default function questions(state={}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case VOTE_FOR_QUESTION:
            const question = state[action.questionId]
            const newVotes = [...question[action.option].votes, action.userId];
            const newOption = {
                ...question[action.option],
                votes: newVotes
            }
            const updatedQuestion = Object.assign({}, question, { [action.option] : newOption})
            return {
                ...state,
                [action.questionId] : updatedQuestion
            }
        case ADD_NEW_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        default:
            return state;
    }
}

