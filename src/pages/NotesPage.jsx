import { Download, Edit2, Search, StickyNote, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, updateNote } from "../redux/slices/notesSlice";

const NotesPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);
  const notes = useSelector(state => state.notes.notes);
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const filteredNotes = notes
    .filter(note => note.content.toLowerCase().includes(search.toLowerCase()))
    .filter(note => filterTag === 'All' || note.tag === filterTag);

  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.content);
  };

  const handleSaveEdit = (id) => {
    dispatch(updateNote({ id, content: editText }));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this note?')) {
      dispatch(deleteNote(id));
    }
  };

  const exportToPDF = () => {
    alert('PDF export feature - In production, this would generate a PDF with all your notes!');
  };

  return (
    <div className={`flex-1 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-4 overflow-y-auto`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 opacity-50" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg ${theme === 'dark'
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-300'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
          </div>

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className={`px-4 py-3 rounded-lg ${theme === 'dark'
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all`}
          >
            <option value="All">All Tags</option>
            <option value="Important">Important</option>
            <option value="Idea">Idea</option>
            <option value="Reminder">Reminder</option>
            <option value="General">General</option>
          </select>

          <button
            onClick={exportToPDF}
            className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 transition-colors font-medium"
          >
            <Download size={20} />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 opacity-50">
            <StickyNote size={48} className="mx-auto mb-4" />
            <p className="text-lg">
              {notes.length === 0 ? 'No notes yet. Start chatting to create some!' : 'No notes match your search'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map(note => (
              <div
                key={note.id}
                className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-3 py-1 rounded font-medium ${note.tag === 'Important' ? 'bg-red-500 text-white' :
                      note.tag === 'Idea' ? 'bg-purple-500 text-white' :
                        note.tag === 'Reminder' ? 'bg-yellow-500 text-white' :
                          'bg-gray-500 text-white'
                    }`}>
                    {note.tag}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-blue-500 hover:text-blue-600 transition-colors p-1"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-500 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {editingId === note.id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                        } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      rows={4}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleSaveEdit(note.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{note.content}</p>
                )}

                <p className="text-xs opacity-70 mt-3">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;