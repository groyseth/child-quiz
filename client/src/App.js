import React from 'react';
import MainComponent from './components/MainComponent';
import SignUp from './components/LandingUser/SignUp';
import Login from './components/LandingUser/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


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


function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
          <Router>
            <Route exact path='/' component={MainComponent} />
            <Route path='/signUp' component={SignUp} />
            <Route path='/logIn' component={Login} />
             </Router>
          </Switch>
   
   </ApolloProvider>
  );
}

export default App;