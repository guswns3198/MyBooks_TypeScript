// 인증을 관리하는 파일

import { Action, createActions, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import { LoginReqType } from "../../types";
import UserService from '../../services/userService';
import TokenService from "../../services/tokenService";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
};

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null
};

const prefix = 'my-books/auth';

export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

const reducer = handleActions<AuthState, string>({
  PENDING: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  SUCCESS: (state, action) => ({
    token: action.payload,
    loading: false,
    error: null,
  }),
  FAIL: (state, action: any) => ({
    ...state,
    loading: true,
    error: action.payload,
  }),
}, initialState, { prefix });

export default reducer;

// saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', { prefix })

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    TokenService.set(token)

    yield put(success(token));
    // push

  } catch (error) {
    yield put(fail(new Error('UNKNOWN_ERROR')))
  }
}

function* logoutSaga() {

}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga)
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga)
}