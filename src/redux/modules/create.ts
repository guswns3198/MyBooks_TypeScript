// store를 만드는 역할을 하는 파일

import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";

const create = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  
  return store;
}


export default create;