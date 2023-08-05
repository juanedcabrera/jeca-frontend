// App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideNav from './components/SideNav';
import Jobs from './pages/Jobs';
import Tasks from './pages/Tasks';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        <SideNav isOpen={true} />
        <div className="ml-64">
          <Routes>
            <Route path="/jobs" Component={Jobs} />
            <Route path="/tasks" Component={Tasks} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
