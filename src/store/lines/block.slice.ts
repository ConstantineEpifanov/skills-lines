import { createSlice } from '@reduxjs/toolkit';

type BlockFilterState = {
  skillName: string;
  profName: string;
  mainSkills: string[];
  otherSkills: string[];
  professionArray: string[];
};

const initialState: BlockFilterState = {
  skillName: '',
  profName: '',
  mainSkills: [],
  otherSkills: [],
  professionArray: [],
};

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    setNewBlock(state, action) {
      Object.assign(state, action.payload);
    },
  },
});

export const blockActions = blockSlice.actions;
export const blockReducer = blockSlice.reducer;
