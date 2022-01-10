// Modules
import { useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

// Hooks
import useForm from '../hooks/useForm';

export default function SignIn() {
  //
  const { signIn, loadingSignInUser, token } = useContext(GeneralContext);

  const { inputValues, handleInputChange } = useForm({
    email: 'test@gmail.com',
    password: 'Testing',
  });
  const { email, password } = inputValues;

  if (token) return <Navigate to='/user' />;
  else {
    return (
      <Container>
        <div className='w-full sm:w-8/12 lg:w-6/12 xl:w-4/12'>
          <div className='bg-neutral-600 rounded-t px-6 py-4'>
            <h2 className={generalTitle}>Iniciar sesión</h2>
          </div>
          <form
            className='p-6 bg-white rounded-b flex flex-col mb-4'
            onSubmit={(e) => {
              e.preventDefault();
              signIn({ email, password });
            }}
          >
            <label className={signLabel}>Correo</label>
            <input
              type='email'
              className={grayInput}
              name='email'
              value={email}
              onChange={handleInputChange}
              autoComplete='off'
              disabled={loadingSignInUser}
            />
            <label className={signLabel}>Contraseña</label>
            <input
              type='password'
              className={grayInput}
              name='password'
              value={password}
              onChange={handleInputChange}
              autoComplete='off'
              disabled={loadingSignInUser}
            />
            <div>
              <button
                className={`${blueButton} mt-2`}
                disabled={loadingSignInUser}
                type='submit'
              >
                {loadingSignInUser ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </div>
          </form>
        </div>
        <NavLink to='/sign-up'>
          <span className=''>¿No tienes cuenta? Regístrate!</span>
        </NavLink>
      </Container>
    );
  }
}
