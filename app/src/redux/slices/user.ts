import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  name: string;
}

const initialState: UserState = { name: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
    },
    logout: (state) => {
      state = { ...initialState };
    }
  }
});

export const { set, logout } = userSlice.actions;
export default userSlice.reducer;
