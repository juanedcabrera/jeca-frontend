// SideNav.tsx
import { Link } from 'react-router-dom';

type SideNavProps = {
    isOpen: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 bg-white p-4 shadow-md`}
    >
      <h2 className="text-2xl font-semibold text-black">Menu</h2>
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
      </ul>
    </div>
  );
};

export default SideNav;
