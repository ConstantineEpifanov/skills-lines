import { createSlice } from '@reduxjs/toolkit';

type CirclesState = {
  skills: string[];
  professions: string[];
};

const initialState: CirclesState = {
  skills: [],
  professions: [],
};

export const circlesSlice = createSlice({
  name: 'circles',
  initialState,
  reducers: {
    setSkillsCircle(state, action) {
      state.skills = action.payload.skills;
    },
    setProfessionCircle(state, action) {
      state.professions = action.payload.professions;
    },
  },
});

export const circlesActions = circlesSlice.actions;
export const circlesReducer = circlesSlice.reducer;
