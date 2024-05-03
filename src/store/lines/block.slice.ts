/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const blockActions = blockSlice.actions;
export const blockReducer = blockSlice.reducer;
