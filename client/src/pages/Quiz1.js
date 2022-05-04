import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom'
import images from '../assets/images/index';
import "./quiz1.css"
import { useMutation } from '@apollo/client';
import { ADD_SCORE } from '../utils/mutations';
import Auth from '../utils/auth';
export default function App() {

	const questions = [
		{
			questionText: 'Which one is a triangle',
			answerOptions: [
				{ answerText: <img src={images.tryangle} className='image' alt='test' />, isCorrect: true },
				{ answerText: <img src={images.square} className='image' alt='square' />, isCorrect: false },
				{ answerText: <img src={images.trapiziod} className='image' alt='trapiziod' />, isCorrect: false },
				{ answerText: <img src={images.circle} className='image' alt='circle' />, isCorrect: false },
			],
		},
		{
			questionText: 'Which one is a circle?',
			answerOptions: [
				{ answerText: <img src={images.circle} alt='circle' className='image' />, isCorrect: true },
				{ answerText: <img src={images.square} alt='square' className='image' />, isCorrect: false },
				{ answerText: <img src={images.trapiziod} alt='trapiziod' className='image' />, isCorrect: false },
				{ answerText: <img src={images.tryangle} alt='tryangle' className='image' />, isCorrect: false },
			],
		},
		{
			questionText: 'Which one is a square?',
			answerOptions: [
				{ answerText: <img src={images.trapiziod} alt='trapiziod' className='image' />, isCorrect: false },
				{ answerText: <img src={images.circle} alt='circle' className='image' />, isCorrect: false },
				{ answerText: <img src={images.square} alt='square' className='image' />, isCorrect: true },
				{ answerText: <img src={images.tryangle} alt='tryangle' className='image' />, isCorrect: false },
			],
		},
		{
			questionText: <img src={images.three} alt="three of them" className='tri' />,
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '2', isCorrect: false },
				{ answerText: '3', isCorrect: true },
				{ answerText: '4', isCorrect: false },
			],
		},
	];
	const [addScore, { error }] = useMutation(ADD_SCORE);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [showCorrectAnswer, setCorrectAnswer] = useState(false);
	const handleAnswerOptionClick = async (isCorrect) => {

		if (isCorrect) {
			setScore(score + 1);
			setCorrectAnswer(true)
		} else {
			setShowAnswer(true);
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
					createdAt: "",
				},
			});
			window.location.replace('/quizDashboard')
			console.log(data);
		} catch (err) {
			console.error(JSON.stringify(err));
		}
	}
	return (
		<div className='app'>
			{Auth.loggedIn() ? (

				<>
					{showScore ? (
						<div className='score-section'>
							You scored {score} out of {questions.length}
							<button onClick={() => window.location.replace('/quizDashboard')} >Home</button>
							<button onClick={() => window.location.reload()}> Retry</button>
							<button onClick={() => handleSubmit(score)}>Save Score</button>
						</div>
					) : (
						<>
							<div className='question-section'>
								<div className='question-count'>
									<span>Question {currentQuestion + 1}</span>/{questions.length}
								</div>
								<div className='question-text'>{questions[currentQuestion].questionText}</div>
							</div>
							<div className='answer-section'>
								{questions[currentQuestion].answerOptions.map((answerOption) => (
									<>
										<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
									</>
								))}
							</div>
						</>
					)}
					{showAnswer ? (
						<>
							<div>Wong answer, Keep it up!</div>
							<button onClick={() => handleNextButton()}>Next Question</button>
						</>
					) : (<></>)}
					{showCorrectAnswer ? (<>
						<h1>Correct!</h1>
						<button onClick={() => handleNextButton()}>Next Question</button>
					</>) : (<></>)}
				</>
			) : (<>

				<h1>Please Login</h1>

			</>)}
		</div>
	);
}