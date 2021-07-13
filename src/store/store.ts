import {
  createStore,
  applyMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./saga";
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from "./reducer";

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware(),
  createLogger({
    collapsed: true,
  }),
  sagaMiddleware,
];

export const store = createStore(
  rootReducer,
  composeWithDevTools({})(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);
