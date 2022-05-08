import React, { useState } from 'react';
import images from '../assets/images/index';
import "./quiz1.css"
import sounds from '../assets/audio';
import DemoNav from '../components/DemoNav';
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
			questionText: <div>
				<img src={images.three} alt="three of them" className='tri' />
				<h1>Can you count the number of triangles?</h1>
			</div>,
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
			let Keyc = new Audio(sounds.correct);
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
	function handleMusic() {
		var randomArr = ["g", "h", "j", "k"];
		console.log(randomArr);

		var i = 0
		var player = setInterval(() => {
			var test = randomArr[i]
			// console.log(test);
			i++
			if (i === randomArr.length) {
				clearInterval(player)
			}
			switch (test) {
				case "g":
					console.log("keypressedg");
					gLiteralKey();
					break;
				case "h":
					console.log("keypressedh");
					hLiteralKey();
					break;
				case "j":
					console.log("keypressedj");
					jLiteralKey();
					break;
				case "k":
					console.log("keypressedk");
					kLiteralKey();
					break;


			}
		}, 180);

		console.log("playback");

		const gLiteralKey = () => {
			let Key = new Audio(sounds.gkey);
			Key.addEventListener("canplaythrough", event => {
				/* the audio is now playable; play it if permissions allow */
				Key.play();
			});
		}
		const hLiteralKey = () => {
			let Key = new Audio(sounds.akey);
			Key.addEventListener("canplaythrough", event => {
				/* the audio is now playable; play it if permissions allow */
				Key.play();
			});
		}
		const jLiteralKey = () => {
			let Key = new Audio(sounds.bkey);
			Key.addEventListener("canplaythrough", event => {
				/* the audio is now playable; play it if permissions allow */
				Key.play();
			});
		}
		const kLiteralKey = () => {
			let Key = new Audio(sounds.highc);
			Key.addEventListener("canplaythrough", event => {
				/* the audio is now playable; play it if permissions allow */
				Key.play();
			});
		}

	}

	return (
		<div className='quizBackGround'>
			<DemoNav />

			<>
				{showScore ? (
					<div className='score-section'>
						<h1>You scored {score} out of {questions.length}!</h1>
						<button onClick={() => window.location.replace('/signUp')} >Sign Up</button>
						
						{handleMusic()}
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

					</>
				)}
				{showAnswer ? (
					<div style={{ marginTop: '11vh', textAlign: 'center' }} className='animation'>
						<div className='wrongAnswer'>Almost, Keep it up!</div>
						<button onClick={() => handleNextButton()}>Next Question</button>
					</div>
				) : (<></>)}
				{showCorrectAnswer ? (<div style={{ marginTop: '11vh', textAlign: 'center' }} className='animation'>

					<div className='correctAnswer'>Correct!</div>
					<button onClick={() => handleNextButton()}>Next Question</button>

				</div>) : (<></>)}
			</>

		</div>
	);
}