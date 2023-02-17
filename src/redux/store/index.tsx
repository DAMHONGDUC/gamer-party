import {configureStore} from '@reduxjs/toolkit';
import appSlide from 'redux/slices/appSlide';

export const store = configureStore({
  reducer: {
    app: appSlide,
  },
});
