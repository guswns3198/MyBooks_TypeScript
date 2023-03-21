// 인증을 관리하는 파일

import { createActions, handleActions } from "redux-actions";

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

export const { pending, success, fail } = createActions("PENDING", "SUCCESS", "FAIL", { prefix });

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
export function* authSaga() {
  
}