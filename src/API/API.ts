// use to handle data and API call

import { shuffleArray } from "../utils/utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}
export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    // await first fetch itself then await to  convert into json
    const data = await (await fetch(endpoint)).json();
    // console.log(data);
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([
                ...question.incorrect_answers, 
                question.correct_answer,
            ]),
        }
    ));
};
