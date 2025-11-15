import { useState } from "react";
import { useSelector } from "react-redux";

const MessageBubble = ({ message, onSaveNote }) => {
    const theme = useSelector(state => state.theme.mode);
    const [showSave, setShowSave] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState('General');
    const [reaction, setReaction] = useState(null);

    const handleSave = () => {
        setShowTagModal(true);
    };

    const confirmSave = () => {
        onSaveNote(message, selectedTag);
        setShowTagModal(false);
        setSelectedTag('General');
    };

    const isUser = message.role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
            <div
                className={`max-w-[70%] rounded-lg px-4 py-3 transition-all duration-200 hover:scale-[1.02] ${isUser
                        ? 'bg-blue-500 text-white'
                        : theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                    }`}
                onMouseEnter={() => setShowSave(true)}
                onMouseLeave={() => setShowSave(false)}
            >
                <p className="wrap-break-words">{message.text}</p>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                    {!isUser && (
                        <div className="flex gap-1">
                            {['👍', '❤️', '😊'].map(emoji => (
                                <button
                                    key={emoji}
                                    onClick={() => setReaction(emoji)}
                                    className={`text-sm hover:scale-125 transition-transform cursor-pointer ${reaction === emoji ? 'scale-125' : ''}`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {showSave && !isUser && (
                    <button
                        onClick={handleSave}
                        className="mt-2 text-xs px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors cursor-pointer"
                    >
                        💾 Save Note
                    </button>
                )}
            </div>

            {showTagModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg p-6 w-full max-w-md shadow-2xl`}>
                        <h3 className="text-lg font-bold mb-4">Choose a Tag</h3>
                        <div className="space-y-2">
                            {['Important', 'Idea', 'Reminder', 'General'].map(tag => (
                                <label key={tag} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-opacity-10 hover:bg-blue-500 transition-colors">
                                    <input
                                        type="radio"
                                        name="tag"
                                        value={tag}
                                        checked={selectedTag === tag}
                                        onChange={(e) => setSelectedTag(e.target.value)}
                                        className="w-4 h-4 accent-blue-500"
                                    />
                                    <span>{tag}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={confirmSave}
                                className="flex-1 bg-blue-500 text-white py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors font-medium"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowTagModal(false)}
                                className="flex-1 bg-gray-500 text-white py-2 rounded cursor-pointer hover:bg-gray-600 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageBubble;