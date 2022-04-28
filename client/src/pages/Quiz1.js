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
				{ answerText: <img src={images.square} className='image' alt='square'  />, isCorrect: false },
				{ answerText: <img src={images.trapiziod} className='image' alt='trapiziod'  />, isCorrect: false },
				{ answerText: <img src={images.circle} className='image' alt='circle' />, isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = ( isCorrect) => {
		
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			// if(!isCorrect || isCorrect===false){
			// 	const test = event.target.id
			// 	console.log(test);
			// 	var element = document.getElementById("test");
  			// 	element.classList.toggle("style");
			// }
			setCurrentQuestion(nextQuestion);
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
					<button onClick={()=> window.location.reload()}> retry</button>
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
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
					
				</>
			)}
		</div>
	);
}