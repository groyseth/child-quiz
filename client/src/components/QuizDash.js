import React, { useState } from 'react'
import NavBar from './NavBar'
import './QuizHome.css'
import './Main.css'
import { useQuery } from '@apollo/client'
import { SCORES } from '../utils/query'


export default function QuizHomePage() {

  const [showScore, setShowScore] = useState(true)

  const { error, data } = useQuery(SCORES, {
    variables: { userId: localStorage.getItem('userId') }
  });
  // console.log(error);
  const singleUser = data?.singleUser || [];
  const singScore = data?.singleUser.scores || [];


const test = () => {
  var result = 0;
  for (let i = 0; i < singScore.length; i++) {
    var element = singScore[i].scored;
    // result = 0;
    result += element;
    // console.log(result);
  }
  // console.log(element);
  // if(element > 0 ){
  //   console.log("else");
  //   setShowScore(true)
  // }else{
  //   setShowScore(false)
  // }
  // console.log(result);
  return result
}
  

  return (
    <div className='backGround' >
      <NavBar />
      <div className='dash'>
        <div style={{ marginTop: '18%' }}>
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
      <div style={{ textAlign: 'center' }}>
        {showScore ? (<>
          <h1>{singleUser.userName} has a score of {test()}!</h1>
          <p>Great Job {singleUser.userName} and keep up the good work!!</p>
        </>)
          : (<>
          <h1>Take a quiz to build youre score!</h1>
          </>)}
      </div>
    </div>
  )
}
