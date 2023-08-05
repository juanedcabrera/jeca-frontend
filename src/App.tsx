// App.tsx
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideNav from './components/SideNav';
import Jobs from './pages/Jobs';
import Tasks from './pages/Tasks';
import './App.css';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        <button
          className={`fixed top-4 left-4 z-10 ${isOpen ? 'opened-button' : 'closed-button'}`}
          onClick={handleToggleSideNav}
        >
          {/* Add an icon or text to represent the open/close button */}
          {isOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        <SideNav isOpen={isOpen} />
        <div className={`ml-64 transition-all ${isOpen ? 'pl-64' : 'pl-0'}`}>
          <Routes>
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
