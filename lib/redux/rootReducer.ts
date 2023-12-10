import { persistReducer } from 'redux-persist';
import { tasksSlice } from './slices';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'APP_STATE',
  storage,
  whitelist: ['tasks'],
};

export const reducer = persistReducer(
  persistConfig,
  combineReducers({
    tasks: tasksSlice.reducer,
  })
);
