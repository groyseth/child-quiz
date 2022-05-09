import React, { useState } from 'react'
import NavBar from './NavBar'
import './QuizHome.css'
import './Main.css'
import { useQuery } from '@apollo/client'
import { SCORES } from '../utils/query'


export default function QuizHomePage() {

  const [showScore, setShowScore] = useState(true);

  const { error, data } = useQuery(SCORES, {
    variables: { userId: localStorage.getItem('userId') }
  });
  // console.log(error);
  const singleUser = data?.singleUser || [];
  const singScore = data?.singleUser.scores || [];


const test = (result) => {
  var result = 0;
  for (let i = 0; i < singScore.length; i++) {
    var element = singScore[i].scored;
    // result = 0;
    result += element;
    // console.log(result);
  }
  var num = result;
  console.log(num);
  return num
}
setTimeout(() => {
  if(test() === 0){
    console.log("is 0");
    setShowScore(false)
    clearTimeout();
  }else{
    console.log("is more");
    setShowScore(true)
    clearTimeout();
  }
}, 500);
  
// if(test() === 0){
//   console.log("none");
//   setShowScore(false)
// }
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
      <div style={{ textAlign: 'center', marginTop: '86px' }}>
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
