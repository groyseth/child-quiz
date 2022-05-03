import React, { useState } from 'react';
import MainComponent from './components/MainComponent';
import SignUp from './components/LandingUser/SignUp';
import Login from './components/LandingUser/Login';
import Quiz1 from './pages/Quiz1';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import auth from './utils/auth';
import QuizHomePage from './components/QuizDash';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({

  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const test = auth.loggedIn()
console.log(test);
function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Router>
          
          <Route exact path='/' component={MainComponent} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/logIn' component={Login} />
          <Route path='/quizDashboard' component={QuizHomePage} />
          <Route path='/quiz1' component={Quiz1} />
        </Router>
      </Switch>

    </ApolloProvider>
  );
}

export default App;

{/* <Route
  exact
  path="/"
  render={() => (loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />)}
/>; */}