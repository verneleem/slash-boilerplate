import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import createApolloClient from './ApolloConfig';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { TestNodes } from './TestNodes';
import { UserAggregateResult } from './types/graphql';

function Default() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { data, loading, error } = useQuery<{
    __typename: string;
    aggregateUser: UserAggregateResult;
  }>(
    gql`
      query upCheck {
        __typename
        aggregateUser {
          count
        }
      }
    `,
  );
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            width: '800px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <img src={logo} className="App-logo" alt="React logo" />
          <img
            src="https://dgraph.io/assets/images/slashgraphql-logo.svg"
            // src="https://qsius.com/skins/Dgraph/assets/images/favicons/safari-pinned-tab.svg"
            className="Slash-logo"
            // className="App-logo"
            alt="Slash GraphQL logo"
          />
          <img
            src="https://openid.net/wordpress-content/uploads/2016/05/auth0-logo-blue.png"
            className="Slash-logo"
            alt="Auth0 logo"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg"
            className="App-logo"
            alt="GraphQL Logo"
          />
        </div>
        {loading && <p>Connecting to Slash GraphQL</p>}
        {error && (
          <>
            <p>Could not connect to Slash GraphQL:</p>
            <pre
              style={{
                textAlign: 'left',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontSize: '14px',
              }}
            >
              {Boolean(error) && JSON.stringify(error, undefined, '  ')}
            </pre>
          </>
        )}
        <p>
          {data?.__typename === 'Query' && (
            <>Successfully connected to Slash GraphQL!</>
          )}
          {data?.aggregateUser && (
            <> Found {data.aggregateUser.count} user(s)</>
          )}
        </p>
        <a className="App-link" href="/test">
          CRUD Test
        </a>
        {isAuthenticated && (
          <>
            <p>A login was successful with the following user data:</p>
            <pre
              style={{
                textAlign: 'left',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontSize: '14px',
              }}
            >
              {JSON.stringify(user, undefined, '  ')}
            </pre>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <p>There is currently no Authenticated User.</p>
            <button
              onClick={() => loginWithRedirect()}
              style={{ padding: '10px' }}
            >
              Authenticate with Auth0
            </button>
          </>
        )}
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            minWidth: '650px',
          }}
        >
          <a
            className="App-link"
            href="https://dgraph.io/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Slash
          </a>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
      </header>
    </div>
  );
}

function App() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  return (
    <ApolloProvider
      client={createApolloClient(isAuthenticated ? getIdTokenClaims : null)}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/test" component={TestNodes} />
          <Route path="/" component={Default} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
