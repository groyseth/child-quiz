import React, { useState } from 'react';
import images from '../assets/images/index';
import "./quiz1.css"
import { useMutation } from '@apollo/client';
import { ADD_SCORE } from '../utils/mutations';
// import ReactCSSTransitionGroup from 'react-transition-group';
import QuizNav from '../components/QuizNav';
import moment from 'moment';
import sounds from '../assets/audio';

export default function Quiz1() {

	const questions = [
		{
			questionText:<div><img src={images.thinking} alt='thinking'/><h1>Which one is a triangle?</h1></div> ,
			answerOptions: [
				{ answerText: <img src={images.tryangle} className='image' alt='test' />, isCorrect: true, id: 1 },
				{ answerText: <img src={images.square} className='image' alt='square' />, isCorrect: false, id: 2 },
				{ answerText: <img src={images.trapiziod} className='image' alt='trapiziod' />, isCorrect: false, id: 3 },
				{ answerText: <img src={images.circle} className='image' alt='circle' />, isCorrect: false, id: 4 },
			],
		},
		{
			questionText: <div><img src={images.thinking} alt='thinking'/><h1>Which one is a circle?</h1></div> ,
			answerOptions: [
				{ answerText: <img src={images.circle} alt='circle' className='image' />, isCorrect: true, id: 11 },
				{ answerText: <img src={images.square} alt='square' className='image' />, isCorrect: false, id: 22 },
				{ answerText: <img src={images.trapiziod} alt='trapiziod' className='image' />, isCorrect: false, id: 33 },
				{ answerText: <img src={images.tryangle} alt='tryangle' className='image' />, isCorrect: false, id: 44 },
			],
		},
		{
			questionText: <div><img src={images.thinking} alt='thinking'/><h1>Which one is a square?</h1></div> ,
			answerOptions: [
				{ answerText: <img src={images.trapiziod} alt='trapiziod' className='image' />, isCorrect: false, id: 111 },
				{ answerText: <img src={images.circle} alt='circle' className='image' />, isCorrect: false, id: 222 },
				{ answerText: <img src={images.square} alt='square' className='image' />, isCorrect: true, id: 333 },
				{ answerText: <img src={images.tryangle} alt='tryangle' className='image' />, isCorrect: false, id: 444 },
			],
		},
		{
			questionText:
				<div>
					<img src={images.star} alt="star"  />
					<h1>This shape is a...?</h1>
				</div>,
			answerOptions: [
				{ answerText: 'Square', isCorrect: false, id: 1111 },
				{ answerText: 'Triangle', isCorrect: false, id: 2222 },
				{ answerText: 'Trapaziod', isCorrect: false, id: 3333 },
				{ answerText: 'Star', isCorrect: true, id: 4444 },
			],
		},
		{
			questionText:
				<div>
					<img src={images.three} alt="three of them" className='tri' />
					<h1>These shapes are not a square or a circle, they are ....?</h1>
				</div>,
			answerOptions: [
				{ answerText: 'Squares', isCorrect: false, id: 1111 },
				{ answerText: 'Circles', isCorrect: false, id: 2222 },
				{ answerText: 'Triangles', isCorrect: true, id: 3333 },
				{ answerText: 'Ovals', isCorrect: false, id: 4444 },
			],
		},
	];

	const [addScore] = useMutation(ADD_SCORE);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [showWrongAnswer, setshowWrongAnswer] = useState(false);
	const [showCorrectAnswer, setCorrectAnswer] = useState(false);
	const [disable, setDisable] = useState(false)
	const handleAnswerOptionClick = async (isCorrect) => {

		if (isCorrect) {
			setScore(score + 1);
			setCorrectAnswer(true)
			setshowWrongAnswer(false)
			let Keyc = new Audio(sounds.correct);
			Keyc.addEventListener("canplaythrough", event => {
				Keyc.play();
			});
			setDisable(true)
		}
		if(!isCorrect){
			console.log("not correct");
			setCorrectAnswer(false)
			setshowWrongAnswer(true)
			let Key = new Audio(sounds.wrong1);
			Key.addEventListener("canplaythrough", event => {
				Key.play();
			});
			setDisable(true)
		}
	};

	
	const handleNextButton = () => {
		console.log("click");
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setshowWrongAnswer(false);
			setCorrectAnswer(false);
			setCurrentQuestion(nextQuestion);
			setDisable(false)
		} else {
			setshowWrongAnswer(false);
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

	
	function handleMusic() {
		var randomArr = ["g", "h","", "j", "k"];
		console.log(randomArr);

		var i = 0
		var player = setInterval(() => {
			var test = randomArr[i]
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
		}, 187);

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
			<QuizNav />

			<>
				{showScore ? (
					<div className='score-section'>
						<h1>You scored {score} out of {questions.length}!</h1>
						<button onClick={() => handleSubmit(score)}>Save Score</button>
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
							{disable?(<>
							{questions[currentQuestion].answerOptions.map((answerOption) => (
								<div key={answerOption.id} className='questions slideAnimation'>
									<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} disabled>{answerOption.answerText}</button>
								</div>
							))}
							</>):(
							<>
							{questions[currentQuestion].answerOptions.map((answerOption) => (
								<div key={answerOption.id} className='questions '>
									<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} >{answerOption.answerText}</button>
								</div>
							))}
							</>)}
						</div>
					</>
				)}
				{showWrongAnswer ? (
					<div style={{ marginTop: '11vh', textAlign: 'center' }} className='animation'>
						<div className='wrongAnswer'>Wong answer, Keep it up!</div>
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