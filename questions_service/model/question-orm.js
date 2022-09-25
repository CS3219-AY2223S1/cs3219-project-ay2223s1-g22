import { createQuestion, getQuestion } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateQuestion(difficulty, title, description, input, output) {
    try {
        const newQuestion = await createQuestion({difficulty, title, description, input, output});
        newQuestion.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new question');
        return { err };
    }
}

export async function ormGetQuestion(difficulty) {
    await getQuestion(difficulty).then(question => {
        return question;
    }).catch(err => {
        console.log(err);
        return { err };
    })
}