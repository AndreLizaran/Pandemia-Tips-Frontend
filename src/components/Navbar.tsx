// Modules
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

// Classes
import { blueButton } from '../utils/classes';

export default function Navbar() {
  //
  return (
    <nav className='px-6 py-4 bg-gray-600 flex justify-between items-center'>
      <NavLink to='/'>
        <h1 className='text-white text-xl font-semibold'>Pandemia Tips</h1>
      </NavLink>
      <NavLink to='/sign-in'>
        <button className={blueButton}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </NavLink>
    </nav>
  );
}
