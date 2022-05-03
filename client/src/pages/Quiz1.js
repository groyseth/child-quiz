import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom'
import images from '../assets/images/index';
import "./quiz1.css"
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
				{ answerText: <img src={images.square} alt='square' className='image'/>, isCorrect: false },
				{ answerText: <img src={images.trapiziod} alt='trapiziod' className='image'/>, isCorrect: false },
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
			questionText: <img src={images.three} alt="tryangle" className='tri' /> ,
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '2', isCorrect: false },
				{ answerText: '3', isCorrect: true },
				{ answerText: '4', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);

	const handleAnswerOptionClick = async (isCorrect) => {

		if (isCorrect) {
			setScore(score + 1);
			// setShowAnswer(false);
		} else {
			// alert('no')
			// setTimeout(() => {
				setShowAnswer(true);
			// }, 500);
			
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setTimeout(() => {
			setShowAnswer(false);
				setCurrentQuestion(nextQuestion);
			}, 3000);
			
		} else {
			setShowScore(true);
		}
	};

	
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
					<button ><Link to='/quizDashboard'>Home</Link> </button>
					<button onClick={() => window.location.reload()}> retry</button>
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
					
				</>
			) : (<></>)}
		</div>
	);
}