import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  uid: null,
};

export const appSlide = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;

      console.log(action.payload);
    },
  },
});

export const {setUid} = appSlide.actions;

export default appSlide.reducer;
