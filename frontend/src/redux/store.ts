
import { configureStore } from '@reduxjs/toolkit';
import vacationsReducer from './vacationsSlice';
import likeReducer from './likeSlice';  


export const store = configureStore({
  reducer: {
    vacations: vacationsReducer,
    likes: likeReducer,  
  },
});

// הגדרת טיפוס RootState עם טיפוס מדויק
export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
