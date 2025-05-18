import { Value } from "@radix-ui/react-select";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Value:false, };
export const incrementSlice = createSlice({
  name: "increment",
  initialState,
  reducers: {
    addValue: (state, action) => {
        console.log("action", action.payload)
    //   state.Value = action.payload;
    
    },
  }
});
export const { addValue } = incrementSlice.actions;

export default incrementSlice.reducer;
