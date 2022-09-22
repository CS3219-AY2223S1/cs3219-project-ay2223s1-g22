import { ormCreateQuestion as _createQuestion } from '../model/question-orm.js'

export async function createQuestion(req, res) {
    try {
        const { difficulty, title, description, input, output } = req.body;
		// console.log(req);
        if (difficulty, title && description && input && output) {
            const resp = await _createQuestion(difficulty, title, description, input, output);
            if (resp.err) {
                return res.status(400).json({message: 'Could not create a new question!'});
            } else {
                console.log(`Created new question: ${title} successfully!`)
                return res.status(201).json({message: `Created new question: ${title} successfully!`});
            }
        } else {
            return res.status(400).json({message: 'Title/description/input/output are all required!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new question!'})
    }
}