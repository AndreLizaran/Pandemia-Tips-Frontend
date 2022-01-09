// Modules
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { blackButton } from '../utils/classes';

export default function Navbar() {
  //
  return (
    <nav className='px-6 py-4 bg-gray-600 flex justify-between items-center'>
      <h1 className='text-white text-xl font-semibold'>Pandemia Tips</h1>
      <button className={blackButton}>
        <FontAwesomeIcon icon={faUser} />
      </button>
    </nav>
  );
}
