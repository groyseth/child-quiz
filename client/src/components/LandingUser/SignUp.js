import React, {useState} from 'react'
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
export default function SignUp() {

  const [formState, setFormState] = useState({
    userName: '',
  password: '',
  firstName: '',
  lastName: ''
  
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
    
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);  

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log("handelformsub",data);
      var userid = data.addUser.users._id;
      localStorage.setItem('userId', userid);
      Auth.login(data.addUser.token);
      window.location.replace('/quizDashboard')
      
    } catch (e) {
      console.error(e);
     
    }
  };


  return (
    <main className=" cardTest backGround">
    <div className="col-12 col-lg-10 cardCenter">
      <div>
        <h4>Sign Up</h4>
        <div >
        {data ? (
            <h1>LOADING</h1>
              ) : (
         
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-control"
                placeholder="Your username"
                name="userName"
                type="text"
                value={formState.userName}
                onChange={handleChange}
              />
                 <input
                className="form-control"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
                <input
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={handleChange}
                />
              <input
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={formState.lastName}
                onChange={handleChange}
              />
              <button
                className="btn btn-block btn-primary butStyle"
                style={{ cursor: 'pointer' }}
                type="submit"
              >Submit
              </button>
            </form>
              )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
          <button onClick={()=> window.location.replace('/')} className='my-3 bg-danger text-white'>Go Back</button>
        </div>
      </div>
    </div>
  </main>
  )
}
