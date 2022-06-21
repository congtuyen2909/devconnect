import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import PrivateRoute from './components/routing/PrivateRoute';

import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
