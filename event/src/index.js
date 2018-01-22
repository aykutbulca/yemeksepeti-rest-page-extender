import {createStore, applyMiddleware} from 'redux';
import {wrapStore, alias} from 'react-chrome-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import aliases from './aliases';

import { getYemeksepetiGlobals  } from '../../shared/actions';

const initialState = {
  orders: [],
  globals: {
    token: '',
    catalog: '',
    culture: 'tr-TR'
  }
}

export const store = createStore(rootReducer, initialState, applyMiddleware(alias(aliases), thunk));

wrapStore(store, {
  portName: 'ys-rso-port'
});