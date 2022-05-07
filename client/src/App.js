import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MainComponent from './components/MainComponent';
import SignUp from './components/LandingUser/SignUp';
import Login from './components/LandingUser/Login';
import Quiz1 from './pages/Quiz1';
import DemoQuiz from './pages/DemoQuiz';
import Profile from './pages/Profile'
import Quiz2 from './pages/Quiz2';
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
          {test?(<>
          <Route path='/quizDashboard' component={QuizHomePage} />
          <Route path='/quiz1' component={Quiz1} />
          <Route path='/profile' component={Profile} />
          <Route path='/quiz2' component={Quiz2} />
          </>):(<></>)}
          <Route exact path='/' component={MainComponent} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/logIn' component={Login} />
          <Route path='/DemoQuiz' component={DemoQuiz} />
        </Router>
      </Switch>

    </ApolloProvider>
  );
}

export default App;