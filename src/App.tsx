import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Todo } from './pages/Todo';
import { AuthProvider } from './component/AuthProvider';
import { AuthRouter } from './component/AuthRouter';

export const App = () => {
  return (
    <Container maxWidth="sm">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <AuthRouter>
              <Route path="/" component={Todo} />
            </AuthRouter>
          </Switch>
        </Router>
      </AuthProvider>
    </Container>
  );
};
