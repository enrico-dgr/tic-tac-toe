import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SocketState {
  connected: boolean;
}

const initialState: SocketState = { connected: false };

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    isConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    }
  }
});

export const { isConnected } = socketSlice.actions;
export default socketSlice.reducer;
