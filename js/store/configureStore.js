import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistState} from 'redux-devtools';
import injectTapEventPlugin from 'react-tap-event-plugin';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

injectTapEventPlugin();

let createStoreWithMiddleware;

// Configure the dev tools when in DEV mode
if (__DEV__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
