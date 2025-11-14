import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import NotesPage from "./pages/NotesPage";
import Header from "./components/Header";
import QuickNotesPanel from "./components/QuickNotesPanel";

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
        <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        {/* <QuickNotesPanel /> */}
      </div>
    </div>
  );
}
