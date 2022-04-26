import React, { useState } from 'react'

export default function Quiz1() {
    const questions = [
        {
            questionText: 'Which one is a tryangle?',
            questionOptions: [
                { answerText: 'Square', isCorrect: false },
                { answerText: 'Tryangle', isCorrect: true },
                {answerText: 'Circle', isCorrect: false},
            ],
        },
        {
            questionText: 'Which one is the number 1',
            questionOptions: [
                {answerText: '3', isCorrect: false},
                {answerText: '1', isCorrect: true},
                {answerText: '4', isCorrect: false},
            ],
        },
    ]

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div >
			{showScore ? (
				<div >
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div >
						<div >
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div >{questions[currentQuestion].questionText}</div>
					</div>
					<div >
						{/* {questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))} */}
					</div>
				</>
			)}
		</div>
	);
}
