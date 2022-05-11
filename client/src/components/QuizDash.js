import React, { useState } from 'react'
import NavBar from './NavBar'
import './QuizHome.css'
import './Main.css'
import { useQuery } from '@apollo/client'
import { SCORES } from '../utils/query'
import sounds from '../assets/audio'

export default function QuizHomePage() {

  const [showScore, setShowScore] = useState(true);
  // const [audio, setAudio] = useState(false);


  const { error, data } = useQuery(SCORES, {
    variables: { userId: localStorage.getItem('userId') }
  });
  const singleUser = data?.singleUser || [];
  const singScore = data?.singleUser.scores || [];


const test = (result) => {
   result = 0;
  for (let i = 0; i < singScore.length; i++) {
    var element = singScore[i].scored;
    result += element;
    // console.log(result);
  }
  var num = result;
  // console.log(num);
  return num
}
setTimeout(() => {
  if(test() === 0){
    // console.log("is 0");
    setShowScore(false)
    clearTimeout();
  }else{
    // console.log("is more");
    setShowScore(true)
    clearTimeout();

  }
}, 100);
  
// setTimeout(() => {
//   if(test() >= 10){
//    console.log("greater than 10");
//    handleMusic();
//     clearTimeout();
//   }else{
//     console.log("less than 10");
//     clearTimeout();
//   }
// }, 1000);

// function handleMusic() {
//   var randomArr = ["g", "h","", "j", "k"];
//   console.log(randomArr);

//   var i = 0
//   var player = setInterval(() => {
//     var test = randomArr[i]
//     i++
//     if (i === randomArr.length) {
//       clearInterval(player)
//     }
//     switch (test) {
//       case "g":
//         console.log("keypressedg");
//         gLiteralKey();
//         break;
//       case "h":
//         console.log("keypressedh");
//         hLiteralKey();
//         break;
//       case "j":
//         console.log("keypressedj");
//         jLiteralKey();
//         break;
//       case "k":
//         console.log("keypressedk");
//         kLiteralKey();
//         break;


//     }
//   }, 200);

//   console.log("playback");
//   const gLiteralKey = () => {
//     let Key = new Audio(sounds.gkey);
//     Key.addEventListener("canplaythrough", event => {
//       /* the audio is now playable; play it if permissions allow */
//       Key.play();
//     });
//   }
//   const hLiteralKey = () => {
//     let Key = new Audio(sounds.akey);
//     Key.addEventListener("canplaythrough", event => {
//       /* the audio is now playable; play it if permissions allow */
//       Key.play();
//     });
//   }
//   const jLiteralKey = () => {
//     let Key = new Audio(sounds.bkey);
//     Key.addEventListener("canplaythrough", event => {
//       /* the audio is now playable; play it if permissions allow */
//       Key.play();
//     });
//   }
//   const kLiteralKey = () => {
//     let Key = new Audio(sounds.highc);
//     Key.addEventListener("canplaythrough", event => {
//       /* the audio is now playable; play it if permissions allow */
//       Key.play();
//     });
//   }
// }

  return (
    <div className='backGround' >
      <NavBar />
      <div className='dash'>
        <div style={{ marginTop: '8%' }}>
          <h1 className='quizTitle'>quiz selection</h1>
          <div className='quizSelect' >
            <button onClick={() => window.location.replace('/quiz1')}>
              Learn Your Shapes!
            </button>
            <button onClick={() => window.location.replace('/quiz2')}>
              Learn Your Numbers!
            </button>
            <button onClick={() => window.location.replace('/quiz3')}>
              Learn Your Animals
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
      {/* {audio ? (<>{handleMusic()}</>):(<></>)} */}
    </div>
  )
}
