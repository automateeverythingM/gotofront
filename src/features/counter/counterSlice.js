import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      if(!action.payload){
        state.user = action.payload;
      }else{
        const {displayName, photoURL} = action.payload;
        state.user = {displayName, photoURL};
      }


    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { setUser, decrement, incrementByAmount } = counterSlice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.user;

export default counterSlice.reducer;
