import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token:
   !!localStorage.getItem('jwt-token')
    ? JSON.parse(localStorage.getItem('jwt-token'))
    : null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('jwt-token', JSON.stringify(action.payload.token));
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.removeItem('jwt-token');
    },
  },
});

export const { setCredentials, logout } = AuthSlice.actions;

export default AuthSlice.reducer;