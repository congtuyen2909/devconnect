import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReduce from './reduces';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReduce,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
