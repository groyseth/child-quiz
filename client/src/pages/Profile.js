import React, { useState } from 'react'
import ProfileNav from '../components/ProfileNav'
import { useQuery, useMutation } from '@apollo/client'
import { SCORES } from '../utils/query'
import { DELETESCORE, DELETEUSER } from '../utils/mutations';
import { Modal, Button } from 'react-bootstrap';
import auth from '../utils/auth';
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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        try {
            const { data } = await removeUser({
                variables: {
                    userId: localStorage.getItem('userId'),
                },
            });
            auth.logout();
            window.location.replace('/');
            console.log(data);
        } catch (err) {
            console.error(JSON.stringify(err));
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
                <h1>Hello {singleUser.firstName}</h1>
                <p>This is your profile, you can reset your quiz's taken and remove profile</p>

                <h1>Youve taken {quizResult} quizes</h1>
                
                <button onClick={() => handleReset()} className='btn btn-danger'>Reset Scores</button>

                <Button variant="btn btn-danger" className='deleteUser' onClick={handleShow}>
                    Delete User
                </Button>
                
            </div>

            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Would you like to delete {singleUser.firstName}'s account?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete()}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>

        </div>
    )
}

