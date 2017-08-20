const express = require('express');

const studentExam = express.Router();

const libs = `${process.cwd()}/libs`;

const log = require(`${libs}/log`)(module);

const User = require(`${libs}/models/user`);

const Topic = require(`${libs}/models/topic`);

const Question = require(`${libs}/models/question`);

const Answer = require(`${libs}/models/answer`);

const StudentAnswer = require(`${libs}/models/studentAnswer`);

studentExam.get('/topic/:id', (req, res, next) => {
    Question.find()
    .populate('topics')
    .exec((err, questions) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        let resQuestions = [];
        questions.forEach((question) => {
            let q = question.toObject();
            q.topics.forEach((topic) => {
                if(topic._id === req.params.id) {
                    resQuestions.push(q);
                }
            });
        });
        res.json(resQuestions);
    });
});

studentExam.post('/answer/:questionId', (req, res, next) => {
    let clientAnswer = req.body.answer;
    let student = req.body.studentId;
    Question.findById(req.params.questionId)
    .populate('answers')
    .populate('correctAnswer')
    .exec((err, question) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        if(!question) {
            return next({message: 'Questão não encontrada.'});
        }

        let studentAnswer;

        if(question.answerType === 'multipleChoice') {
            Answer.findById(clientAnswer, (err, answer) => {
                if(err) {
                    log.error(err);
                    return next(err);
                }
                
                if(!answer) {
                    return next({message: 'A resposta é inválida.'});
                }

                studentAnswer = new StudentAnswer({
                    answerType: question.answerType,
                    answer: answer._id,
                    student: student,
                    question: question._id,
                    correctAnswer: (answer._id === question.correctAnswer)
                });
                
                studentAnswer.save((err) => {
                    if(err) {
                        log.error(err);
                        return next(err);
                    }

                    return res.json(studentAnswer);
                });
            });
        } else if(question.answerType === 'open') {
            Answer.findOne({description: clientAnswer, question: question._id}, (err, answer) => {
                if(err) {
                    log.error(err);
                    return next(err);
                }

                // Em questões abertas, se não tem resultado o aluno errou
                if(!answer) {
                    studentAnswer = new StudentAnswer({
                        answerType: question.answerType,
                        answer: undefined,
                        student: student,
                        question: question._id,
                        correctAnswer: false
                    });


                    studentAnswer.save((err) => {
                        if(err) {
                            log.error(err);
                            return next(err);
                        }

                        return res.json(studentAnswer);
                    });
                }

                studentAnswer = new StudentAnswer({
                    answerType: question.answerType,
                    answer: answer._id,
                    student: student,
                    question: question._id,
                    correctAnswer: true
                });
            });
        }
    });
});

module.exports = studentExam;