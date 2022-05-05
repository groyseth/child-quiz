import React, { useState } from 'react';
import images from '../assets/images/index';
import "./quiz1.css"
export default function DemoQuiz() {

	const questions = [
		{
			questionText: 'What is 1 + 1?',
			answerOptions: [
				{ answerText: "1", isCorrect: false, id: 1 },
				{ answerText: "2", isCorrect: true, id: 2 },
				{ answerText: "3", isCorrect: false, id: 3 },
				{ answerText: "4", isCorrect: false, id: 4 },
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

	return (
		<div className='app'>
			

				<>
					{showScore ? (
						<div className='score-section'>
							You scored {score} out of {questions.length}
							<button onClick={() => window.location.replace('/')} >To Home Page</button>
							<button onClick={() => window.location.reload()}> Retry</button>
							
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
									<div key={answerOption.id} className='questions'>
										<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
									</div>
								))}
							</div>
							<button onClick={()=>window.location.replace('/')} style={{marginTop: '10vh'}}>Quit</button>
						</>
					)}
					{showAnswer ? (
						<div style={{marginTop: '10vh', textAlign: 'center'}}>
							<div>Almost, Keep it up!</div>
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