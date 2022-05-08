import React, { useState } from 'react';
import images from '../assets/images/index';
import "./quiz1.css"
import { useMutation } from '@apollo/client';
import { ADD_SCORE } from '../utils/mutations';
import QuizNav from '../components/QuizNav';
import moment from 'moment';
import sounds from '../assets/audio';
export default function Quiz2() {



	const questions = [
		{
			questionText: 'What is 1 + 1?',
			answerOptions: [
				{ answerText: '2', isCorrect: true, id: 1 },
				{ answerText: '1', isCorrect: false, id: 2 },
				{ answerText: '5', isCorrect: false, id: 3 },
				{ answerText: '10', isCorrect: false, id: 4 },
			],
		},
		{
			questionText: 'Can you count up to 5?',
			answerOptions: [
				{ answerText: '1, 2, 3, 4, 5', isCorrect: true, id: 11 },
				{ answerText: '5, 4, 3, 2, 1', isCorrect: false, id: 22 },
				{ answerText: '1, 2, 3', isCorrect: false, id: 33 },
				{ answerText: '2', isCorrect: false, id: 44 },
			],
		},
		{
			questionText: <div>
				<img src={images.fingers} alt='fingers'></img>
				<h1>Can you count the fingers?</h1>
				</div>,
			answerOptions: [
				{ answerText: '1', isCorrect: false, id: 111 },
				{ answerText: '2', isCorrect: false, id: 222 },
				{ answerText: '4', isCorrect: true, id: 333 },
				{ answerText: '5', isCorrect: false, id: 444 },
			],
		},
		{
			questionText: <div>
				<img src={images.cats} alt='cats'></img>
				<h1>How many Cats are there?</h1>
				</div>,
			answerOptions: [
				{ answerText: '1', isCorrect: false, id: 1111 },
				{ answerText: '2', isCorrect: false, id: 2222 },
				{ answerText: '3', isCorrect: true, id: 3333 },
				{ answerText: '4', isCorrect: false, id: 4444 },
			],
		},
	];
	console.log(questions);
	const [addScore] = useMutation(ADD_SCORE);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [showCorrectAnswer, setCorrectAnswer] = useState(false);
	const handleAnswerOptionClick = async (isCorrect) => {

		if (isCorrect) {
			setScore(score + 1);
			setCorrectAnswer(true)
			let Keyc = new Audio (sounds.correct);
			Keyc.addEventListener("canplaythrough", event => {
			  Keyc.play();
			});
		} else {
			setShowAnswer(true);
			let Key = new Audio(sounds.wrong1);
        Key.addEventListener("canplaythrough", event => {
          Key.play();
        });
		}
	};
	const handleNextButton = () => {
		console.log("click");
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setShowAnswer(false);
			setCorrectAnswer(false);
			setCurrentQuestion(nextQuestion);
		} else {
			setShowAnswer(false);
			setCorrectAnswer(false);
			setShowScore(true);
		}
	}
	const handleSubmit = async (interger) => {
		console.log(interger);
		try {
			const { data } = await addScore({
				variables: {
					userId: localStorage.getItem('userId'),
					scored: interger,
					createdAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
					quizTaken: 1,
				},
			});
			window.location.replace('/quizDashboard')
			console.log(data);
		} catch (err) {
			console.error(JSON.stringify(err));
		}
	}
	return (
		<div className='quizBackGround'>
			<QuizNav />

			<>
				{showScore ? (
					<div className='score-section'>
						You scored {score} out of {questions.length}
						<button onClick={() => handleSubmit(score)}>Save Score</button>
					</div>
				) : (
					<>
						<div className='endText'>
							<div className='question-count'>
								<span>Question {currentQuestion + 1}</span>/{questions.length}
							</div>
							<div className='question-text'>{questions[currentQuestion].questionText}</div>
						</div>
						<div className='answer-section'>
							{questions[currentQuestion].answerOptions.map((answerOption) => (
								<div key={answerOption.id} className="questions">
									<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
								</div>
							))}

						</div>
					
					</>
				)}
				{showAnswer ? (
					<div style={{ marginTop: '11vh', textAlign: 'center' }} className='animation'>
						<div>Wong answer, Keep it up!</div>
						<button onClick={() => handleNextButton()}>Next Question</button>
					</div>
				) : (<></>)}
				{showCorrectAnswer ? (<div style={{ marginTop: '11vh', textAlign: 'center' }} className='animation'>
					<h1>Correct!</h1>
					<button onClick={() => handleNextButton()}>Next Question</button>
				</div>) : (<></>)}
			</>

		</div>
	)
}
