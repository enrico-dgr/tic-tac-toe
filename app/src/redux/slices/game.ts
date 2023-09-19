import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GameState {
  name: string;
}

const initialState: GameState = { name: '' };

const userSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  }
});

export const { set } = userSlice.actions;
export default userSlice.reducer;
