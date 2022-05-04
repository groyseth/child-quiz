import React from 'react'
import { Link, Route } from 'react-router-dom'
import NavBar from './NavBar'
import './QuizHome.css'
// import Quiz1 from '../pages/Quiz1'
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client'
import { SCORES } from '../utils/query'


export default function QuizHomePage() {

  const { error, data } = useQuery(SCORES, {
    variables: { userId: localStorage.getItem('userId') }
  });
  const singleUser = data?.singleUser || [];
  const singScore = data?.singleUser.scores || [];

var result = 0;
for (let i = 0; i < singScore.length; i++) {
  const element = singScore[i].scored;
  result += element;
}


  return (
    <>
          <NavBar />
          <div className='quizSelect'>quiz selection
            <button onClick={() => window.location.replace('/quiz1')}>
              Quiz 1
            </button>
          </div>
        <div>
          <h1>{singleUser.userName} has a score of {result}!</h1>
          <p>Great Job {singleUser.userName} and keep up the good work!!</p>
        </div>
    </>
  )
}
