// src/redux/pasteslice.js
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") 
    ? JSON.parse(localStorage.getItem("pastes")) 
    : []
};

export const pasteslice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully ✅");
    },

    updateToPastes: (state, action) => {
      const index = state.pastes.findIndex(p => p._id === action.payload._id);
      if (index >= 0) {
        state.pastes[index] = action.payload;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated ✅");
      }
    },

    removeFromPastes: (state, action) => {
      state.pastes = state.pastes.filter(p => p._id !== action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Deleted 🗑️");
    },

    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All Pastes Cleared 🧹");
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  removeFromPastes,
  resetAllPaste
} = pasteslice.actions;

export default pasteslice.reducer;
