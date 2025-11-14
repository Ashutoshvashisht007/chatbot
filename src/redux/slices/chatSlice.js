import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    isTyping: false
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString()
      });
    },
    updateMessage(state, action) {
      const { id, changes } = action.payload;
      const idx = state.messages.findIndex(m => m.id === id);
      if (idx >= 0) state.messages[idx] = { ...state.messages[idx], ...changes };
    },
    attachSavedNoteToMessage(state, action) {
      const { messageId, noteId } = action.payload;
      const m = state.messages.find(x => x.id === messageId);
      if (m) m.savedNoteId = noteId;
    },
    clearChat(state) {
      state.messages = [];
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    }
  }
});

export const { addMessage, updateMessage, attachSavedNoteToMessage, clearChat, setTyping } = chatSlice.actions;

export default chatSlice.reducer;
