import { configureStore } from '@reduxjs/toolkit';

import { blockReducer } from './lines/block.slice';
import { circlesReducer } from './lines/circles.slice';

export const store = configureStore({
  reducer: {
    block: blockReducer,
    circles: circlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
