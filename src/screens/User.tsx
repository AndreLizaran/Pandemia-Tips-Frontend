// Modules
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Components
import Container from '../components/Container';

// Contexts
import { GeneralContext } from '../states/GeneralState';
import { blueButton, generalTitle, redButton } from '../utils/classes';

export default function User() {
  //
  const { token, displayName, favorites, signOut } = useContext(GeneralContext);

  if (!token) return <Navigate to='/sign-in' />;
  else {
    return (
      <Container>
        <div className='w-full sm:w-8/12 lg:w-6/12 xl:w-4/12 flex flex-col'>
          <div className='bg-neutral-600 px-6 py-4 rounded-t'>
            <h3 className={generalTitle}>Usuario</h3>
          </div>
          <div className='flex flex-col items-center bg-white rounded-b p-6'>
            <span className='px-10 py-8 bg-gray-200 text-2xl font-semibold rounded-lg'>
              {displayName.charAt(0)}
            </span>
            <h3 className='text-xl mt-4 mb-2'>{displayName}</h3>
            <small className='mb-4'>
              Lugares guardados: {favorites.length}
            </small>
            <button className={redButton} onClick={() => signOut()}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </Container>
    );
  }
}
