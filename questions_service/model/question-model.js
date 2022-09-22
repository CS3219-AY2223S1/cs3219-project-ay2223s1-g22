import mongoose from 'mongoose';

var Schema = mongoose.Schema
let QuestionModelSchema = new Schema({
    difficulty: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
	input: {
        type: String,
        required: true,
    },
	output: {
        type: String,
        required: true,
    },
})

export default mongoose.model('QuestionModel', QuestionModelSchema)