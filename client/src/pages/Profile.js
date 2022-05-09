import React from 'react'
import ProfileNav from '../components/ProfileNav'
import { useQuery, useMutation } from '@apollo/client'
import { SCORES } from '../utils/query'
import { DELETESCORE, DELETEUSER } from '../utils/mutations';


export default function Profile() {
    const [removeScore] = useMutation(DELETESCORE);
    const [removeUser] = useMutation(DELETEUSER)
    const handleReset = async () => {
        try {
            const { data } = await removeScore({
                variables: {
                    userId: localStorage.getItem('userId'),
                },
            });
            window.location.reload();
            console.log(data);
        } catch (err) {
            console.error(JSON.stringify(err));
        }
    }

const handleDelete = async () => {
    var deleteUser = window.confirm(`Do you want to delete ${singleUser.firstName} ${singleUser.lastName}'s account?`);
    if(deleteUser){
        const { data } = await removeUser({
            variables: {
                userId: localStorage.getItem('userId'),
            },
        });
        window.location.replace('/');
        console.log(data);
    }else{
        alert("That was a close one!")
    }
}



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
        <div className='backGround' style={{ textAlign: 'center' }}>
            <ProfileNav />
            <div className='profileStyle'>
                <h1>Hello {singleUser.firstName} {singleUser.lastName}</h1>
                <p>This is your profile, you can update and see quiz information</p>

                <h1>Youve taken {quizResult} quizes</h1>
                <button onClick={() => handleReset()} className='btn btn-danger'>Reset Scores</button>
                <button onClick={() => handleDelete()} className='btn btn-danger'>Delete User</button>
            </div>

        </div>
    )
}

