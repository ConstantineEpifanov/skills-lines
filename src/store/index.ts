import { configureStore } from '@reduxjs/toolkit';

import { blockReducer } from './lines/block.slice';

export const store = configureStore({
  reducer: {
    block: blockReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
