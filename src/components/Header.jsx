import { Menu, MessageSquare, Moon, StickyNote, Sun, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../redux/slices/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector(state => state.theme.mode);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentPage = location.pathname;

  return (
    <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-md`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">AI Chat & Notes</h1>
        
        <nav className="hidden md:flex gap-6 items-center">
          <button 
            onClick={() => navigate("/chat")} 
            className={`flex items-center gap-2 ${currentPage === 'chat' ? 'text-blue-500' : ''} hover:text-blue-400 transition-colors cursor-pointer`}
          >
            <MessageSquare size={20} />
            Chat
          </button>
          <button 
            onClick={() => navigate("/notes")} 
            className={`flex items-center gap-2 ${currentPage === 'notes' ? 'text-blue-500' : ''} hover:text-blue-400 transition-colors cursor-pointer`}
          >
            <StickyNote size={20} />
            Notes
          </button>
          <button 
            onClick={() => dispatch(toggleTheme())} 
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors cursor-pointer`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="cursor-pointer" size={24} /> : <Menu className="cursor-pointer" size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} px-4 py-4 space-y-2`}>
          <button 
            onClick={() => { navigate("/chat"); setMenuOpen(false); }} 
            className="block w-full text-left py-2 hover:text-blue-500 transition-colors cursor-pointer"
          >
            <MessageSquare size={20} className="inline mr-2" />
            Chat
          </button>
          <button 
            onClick={() => { navigate("/notes"); setMenuOpen(false); }} 
            className="block w-full text-left py-2 hover:text-blue-500 transition-colors cursor-pointer"
          >
            <StickyNote size={20} className="inline mr-2" />
            Notes
          </button>
          <button 
            onClick={() => dispatch(toggleTheme())} 
            className="block w-full text-left py-2 hover:text-blue-500 transition-colors cursor-pointer"
          >
            {theme === 'light' ? <Moon size={20} className="inline mr-2" /> : <Sun size={20} className="inline mr-2 " />}
            Toggle Theme
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;