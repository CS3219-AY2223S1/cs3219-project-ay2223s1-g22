import QuestionModel from './question-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.DB_CLOUD_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createQuestion(params) { 
  return new QuestionModel(params)
}

export async function getQuestion(difficulty) {
  const questions = db.question.find({ difficulty: { $eq: difficulty} });
  const randomIndex = Math.floor(Math.random() * questions.length.toString().length * 10) % questions.length;
  return questions[randomIndex];
}