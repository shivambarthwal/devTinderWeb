import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [], // ✅ Must be an array
  reducers: {
    addConnection: (state, action) => action.payload, // ✅ Just replace state
    removeConnection: () => [], // ✅ return [] instead of null
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
