import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import notesReducer from "./slices/notesSlice";
import themeReducer from "./slices/themeSlice";
import { loadPersistedState, persistMiddleware } from "./persistMiddleware";

const preloaded = loadPersistedState();

const store = configureStore({
  reducer: {
    chat: chatReducer,
    notes: notesReducer,
    theme: themeReducer
  },
  preloadedState: preloaded,
  middleware: (getDefault) => getDefault().concat(persistMiddleware)
});

export default store;
