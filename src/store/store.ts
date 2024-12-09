import { configureStore } from '@reduxjs/toolkit';
import dogsReducer from './dogsSlice';
import createDogReducer from "./createDogSlice";

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    createDog: createDogReducer
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;