// Simple persistence to localStorage for slices chat, notes, theme
export const persistMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('chatAppState', JSON.stringify({
    chat: state.chat,
    notes: state.notes,
    theme: state.theme
  }));
  return result;
};

export const loadPersistedState = () => {
  try {
    const saved = localStorage.getItem('chatAppState');
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
};
