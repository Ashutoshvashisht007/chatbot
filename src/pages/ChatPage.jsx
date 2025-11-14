import { useDispatch, useSelector } from "react-redux";
import { addMessage, setTyping } from "../redux/slices/chatSlice";
import { addNote } from "../redux/slices/notesSlice";
import QuickNotesPanel from "../components/QuickNotesPanel";
import { useEffect, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";
import MessageBubble from "../components/MessageBubble";
import geminiService from "../services/geminiService";

const ChatPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);
  const messages = useSelector(state => state.chat.messages);
  const isTyping = useSelector(state => state.chat.isTyping);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    dispatch(addMessage({ role: 'user', text: input }));
    setInput('');
    dispatch(setTyping(true));

    try {
      const response = await geminiService.sendMessage(input);
      dispatch(setTyping(false));
      dispatch(addMessage({ role: 'ai', text: response }));
    } catch (error) {
      dispatch(setTyping(false));
      dispatch(addMessage({ role: 'ai', text: 'Sorry, something went wrong.' }));
    }
  };

  const handleSaveNote = (message, tag) => {
    dispatch(addNote({ content: message.text, tag }));
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 flex flex-col">
        <div className={`flex-1 overflow-y-auto p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 && (
              <div className="text-center py-12 opacity-50">
                <MessageSquare size={48} className="mx-auto mb-4" />
                <p className="text-lg">Start a conversation with AI</p>
              </div>
            )}
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} onSaveNote={handleSaveNote} />
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4 animate-fadeIn">
                <div className={`rounded-lg px-4 py-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <span className="animate-pulse">AI is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-4xl mx-auto flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className={`flex-1 px-4 py-3 rounded-lg ${theme === 'dark'
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-gray-100 text-gray-900 border-gray-300'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <QuickNotesPanel />
    </div>
  );
};

export default ChatPage;