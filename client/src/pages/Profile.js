import React from 'react'
import ProfileNav from '../components/ProfileNav'
import { useQuery } from '@apollo/client'
import { SCORES } from '../utils/query'


export default function Profile() {

  const { error, data } = useQuery(SCORES, {
    variables: { userId: localStorage.getItem('userId') }
  });
  console.log(error);
  const singleUser = data?.singleUser || [];
console.log(singleUser);

const singleQuiz = data?.singleUser.scores || [];

var quizResult = 0;
for (let i = 0; i < singleQuiz.length; i++) {
  const element = singleQuiz[i].quizTaken;
  quizResult += element;
}


  return (
    <>
    <ProfileNav />
    <div>Profile
    <h1>Hello {singleUser.firstName} {singleUser.lastName}</h1>
    <p>This is your profile, you can update and see quiz information</p>
    </div>
<div>
<h1>Youve taken {quizResult} quizes</h1>
</div>

    </>
  )
}

