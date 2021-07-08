import {
  createAsyncThunk,
  createAction,
  createReducer,
  configureStore,
  createStore,
  applyMiddleware,
  getDefaultMiddleware,
  compose,
} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { reducer } from "./reducer";
import { rootSaga } from "./saga";
import { createLogger } from 'redux-logger';
import { EnhancerOptions, composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware(),
  createLogger({
    collapsed: true,
  }),
  sagaMiddleware,
];

export const store = createStore(
  reducer,
  composeWithDevTools({})(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);
