// store/configureStore.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { pinReducer } from '../reducers/pinReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  pins: pinReducer
});

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  // Log initial state
  console.log('Initial Redux State:', store.getState());
  
  // Subscribe to state changes
  store.subscribe(() => {
    console.log('Redux State Updated:', store.getState());
  });

  return store;
};