import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

import ProfilePage from './pages/ProfilePage';
import FavoriteTeams from './pages/FavoriteTeams';

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
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route exact path='/' element={< LandingPage />} />
            <Route path='/Profile' element={<ProfilePage />} />
            <Route path='/FavoriteTeams' element={<FavoriteTeams />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
