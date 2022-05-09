import React, {  useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Link, Redirect, Route, Router } from 'react-router-dom';



export default function Login() {
    const [formState, setFormState] = useState({
        password: '',
        userName: ''
        
      });
      const [loginUser, { error, data }] = useMutation(LOGIN_USER);
    
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
          const { data } = await loginUser({
            variables: { ...formState },
          });
    console.log("logininform",data);
          var userid = data.login.users._id;
          
          localStorage.setItem('userId', userid);
          Auth.login(data.login.token);
          window.location.replace("/quizDashboard");
          
        } catch (e) {
          console.error(e);
          
        }
      };


  return (
    <main className="cardTest backGround">
    <div className="col-12 col-lg-10 cardCenter">
      <div className="">
        <h4 className="">Login</h4>
        <div className="card-body ">
          {data ? (             
           <h1>LOADING</h1>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-control"
                placeholder="Your User Name"
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
              <button
                className="btn btn-block btn-primary butStyle"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Sign In
              </button>
            </form>
        
          )}
          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
              
            </div>
          )}
          <button onClick={()=> window.location.replace('/')} className='my-3  bg-danger text-white'>Go Back</button>
        </div>
      </div>
    </div>
  </main>
  )
}
