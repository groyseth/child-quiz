import React from 'react'
import NavBar from './NavBar'
import './QuizHome.css'
import './Main.css'
import { useQuery } from '@apollo/client'
import { SCORES } from '../utils/query'


export default function QuizHomePage() {

  const { error, data } = useQuery(SCORES, {
    variables: { userId: localStorage.getItem('userId') }
  });
  console.log(error);
  const singleUser = data?.singleUser || [];
  const singScore = data?.singleUser.scores || [];

var result = 0;
for (let i = 0; i < singScore.length; i++) {
  const element = singScore[i].scored;
  result += element;
}


  return (
    <div className='backGround' >
          <NavBar />
          <div className='dash'>
           <div style={{marginTop: '18%'}}>
            <h1>quiz selection</h1>
            <div className='quizSelect' >
            <button onClick={() => window.location.replace('/quiz1')}>
              Learn Your Shapes!
            </button>
            <button onClick={() => window.location.replace('/quiz2')}>
              Learn Your Numbers!
            </button>
            </div>
            </div>
          </div>
        <div style={{textAlign: 'center'}}>
          <h1>{singleUser.userName} has a score of {result}!</h1>
          <p>Great Job {singleUser.userName} and keep up the good work!!</p>
        </div>
    </div>
  )
}
