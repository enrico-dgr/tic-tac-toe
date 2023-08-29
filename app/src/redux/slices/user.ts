import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  name: string;
}

const initialState: UserState = { name: '' };

const userSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  }
});

export const { set } = userSlice.actions;
export default userSlice.reducer;
