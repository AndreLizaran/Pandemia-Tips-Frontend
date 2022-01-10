// Modules
import { useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Hooks
import useForm from '../hooks/useForm';

// Classes
import {
  blueButton,
  generalTitle,
  grayInput,
  signLabel,
} from '../utils/classes';

// Components
import Container from '../components/Container';

// Contexts
import { GeneralContext } from '../states/GeneralState';

export default function SignIn() {
  //
  const { signUp, loadingSignUpUser, token } = useContext(GeneralContext);
  const { inputValues, handleInputChange } = useForm({
    displayName: 'André Lizarán',
    email: 'test@gmail.com',
    password: 'Testing',
  });
  const { email, password, displayName } = inputValues;

  if (token) return <Navigate to='/user' />;
  else {
    return (
      <Container>
        <div className='w-full sm:w-8/12 lg:w-6/12 xl:w-4/12'>
          <div className='bg-neutral-600 rounded-t px-6 py-4'>
            <h2 className={generalTitle}>Registrarse</h2>
          </div>
          <form
            className='p-6 bg-white rounded-b flex flex-col mb-4'
            onSubmit={(e) => {
              e.preventDefault();
              signUp(inputValues);
            }}
          >
            <label className={signLabel}>Nombre</label>
            <input
              type='text'
              className={grayInput}
              name='displayName'
              value={displayName}
              onChange={handleInputChange}
              autoComplete='off'
              disabled={loadingSignUpUser}
            />
            <label className={signLabel}>Correo</label>
            <input
              type='email'
              className={grayInput}
              name='email'
              value={email}
              onChange={handleInputChange}
              autoComplete='off'
              disabled={loadingSignUpUser}
            />
            <label className={signLabel}>Contraseña</label>
            <input
              type='password'
              className={grayInput}
              name='password'
              value={password}
              onChange={handleInputChange}
              autoComplete='off'
              disabled={loadingSignUpUser}
            />
            <div>
              <button
                className={`${blueButton} mt-2`}
                disabled={loadingSignUpUser}
                type='submit'
              >
                {loadingSignUpUser ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
                ) : (
                  'Registrarse'
                )}
              </button>
            </div>
          </form>
        </div>
        <NavLink to='/sign-in'>
          <span className=''>¿No tienes cuenta? Regístrate!</span>
        </NavLink>
      </Container>
    );
  }
}
