import { createSlice } from '@reduxjs/toolkit';
import { SKILLS } from '../../vendors/constants';

type InitialState = (typeof SKILLS)[0];

const initialState: InitialState = {
  name: '',
  mainSkills: [],
  otherSkills: [],
};

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    setNewBlock(state, action) {
      state.name = action.payload.name;
      state.mainSkills = action.payload.mainSkills;
      state.otherSkills = action.payload.otherSkills;
    },
  },
});

export const blockActions = blockSlice.actions;
export const blockReducer = blockSlice.reducer;
