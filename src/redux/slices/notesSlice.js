import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [] // {id, title, content, tag, createdAt, updatedAt, sourceMessageId?}
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.push({
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString()
      });
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(n => n.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...action.payload };
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(n => n.id !== action.payload);
    }
  }
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
