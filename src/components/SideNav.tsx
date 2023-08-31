// SideNav.tsx
import { Link } from 'react-router-dom';

type SideNavProps = {
  isOpen: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ isOpen }) => {
  return (
    <nav className={`h-screen bg-gray-800 w-64 fixed top-0 left-0 p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <ul className="mt-8 space-y-4">
        <li>
          <Link to="/jobs" className="text-gray-700">
            Jobs
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="text-gray-700">
            Tasks
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="text-gray-700">
            Contacts
          </Link>
        </li>
        <li>
          <Link to="/documents" className="text-gray-700">
            Documents
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
