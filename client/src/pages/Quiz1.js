import React, { useState } from 'react';
import images from '../assets/images/index';
import "./quiz1.css"
import { useMutation } from '@apollo/client';
import { ADD_SCORE } from '../utils/mutations';
export default function Quiz1() {

	const questions = [
		{
			questionText: 'Which one is a triangle', 
			answerOptions: [
				{ answerText: <img src={images.tryangle} className='image' alt='test' />, isCorrect: true, id: 1 },
				{ answerText: <img src={images.square} className='image' alt='square' />, isCorrect: false, id: 2 },
				{ answerText: <img src={images.trapiziod} className='image' alt='trapiziod' />, isCorrect: false, id: 3 },
				{ answerText: <img src={images.circle} className='image' alt='circle' />, isCorrect: false, id: 4 },
			],
		},
		{
			questionText: 'Which one is a circle?', 
			answerOptions: [
				{ answerText: <img src={images.circle} alt='circle' className='image' />, isCorrect: true, id: 11 },
				{ answerText: <img src={images.square} alt='square' className='image' />, isCorrect: false, id: 22 },
				{ answerText: <img src={images.trapiziod} alt='trapiziod' className='image' />, isCorrect: false, id: 33 },
				{ answerText: <img src={images.tryangle} alt='tryangle' className='image' />, isCorrect: false, id: 44 },
			],
		},
		{
			questionText: 'Which one is a square?', 
			answerOptions: [
				{ answerText: <img src={images.trapiziod} alt='trapiziod' className='image' />, isCorrect: false, id: 111 },
				{ answerText: <img src={images.circle} alt='circle' className='image' />, isCorrect: false, id: 222 },
				{ answerText: <img src={images.square} alt='square' className='image' />, isCorrect: true, id: 333 },
				{ answerText: <img src={images.tryangle} alt='tryangle' className='image' />, isCorrect: false, id: 444 },
			],
		},
		{
			questionText: <img src={images.three} alt="three of them" className='tri' />,
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
							<button onClick={()=>window.location.replace('/quizDashboard')} style={{marginTop: '10vh'}}>Quit</button>
						</>
					)}
					{showAnswer ? (
						<div style={{marginTop: '10vh', textAlign: 'center'}}>
							<div>Wong answer, Keep it up!</div>
							<button onClick={() => handleNextButton()}>Next Question</button>
						</div>
					) : (<></>)}
					{showCorrectAnswer ? (<div style={{marginTop: '10vh', textAlign: 'center'}}>
						<h1>Correct!</h1>
						<button onClick={() => handleNextButton()}>Next Question</button>
					</div>) : (<></>)}
				</>
			
		</div>
	);
}