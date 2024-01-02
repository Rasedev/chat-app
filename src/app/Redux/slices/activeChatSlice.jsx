import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: 'active',
  initialState: {
    active: 'Russell'
    // active: localStorage.getItem("activeChat")
    //   ? JSON.parse(localStorage.getItem("activeChat"))
    //   : null,
      
  },
  reducers: {
    activeChat: (state, action) => {
     console.log("st", state.active);
     console.log("dd", action.payload);
      state.active = action.payload;
    },
  
  },
});

export const { activeChat  } = activeChatSlice.actions;

export default activeChatSlice.reducer;