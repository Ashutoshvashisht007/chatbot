import { StickyNote } from "lucide-react";
import { useSelector } from "react-redux";

const QuickNotesPanel = () => {
    const theme = useSelector(state => state.theme.mode);
    const notes = useSelector(state => state.notes.notes);
    const latestNotes = notes.slice(-5).reverse();

    return (
        <div className={`w-64 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} p-4 overflow-y-auto hidden lg:block border-l ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <StickyNote size={20} />
                Quick Notes
            </h3>
            <div className="space-y-3">
                {latestNotes.length === 0 ? (
                    <p className="text-sm opacity-70">No notes yet</p>
                ) : (
                    latestNotes.map(note => (
                        <div key={note.id} className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow hover:shadow-md transition-shadow`}>
                            <span className={`text-xs px-2 py-1 rounded ${note.tag === 'Important' ? 'bg-red-500 text-white' :
                                    note.tag === 'Idea' ? 'bg-purple-500 text-white' :
                                        note.tag === 'Reminder' ? 'bg-yellow-500 text-white' :
                                            'bg-gray-500 text-white'
                                }`}>
                                {note.tag}
                            </span>
                            <p className="text-sm mt-2 line-clamp-3">{note.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default QuickNotesPanel;