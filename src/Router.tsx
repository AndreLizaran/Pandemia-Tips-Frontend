// Modules
import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Contexts
import { GeneralContext } from './states/GeneralState';

// Screens
import User from './screens/User';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

export default function Router() {
  //
  const { loadingValidateToken, validateToken } = useContext(GeneralContext);

  useEffect(() => {
    validateToken(localStorage.getItem('pand-tips') || '');
  }, []);

  return (
    <>
      {loadingValidateToken ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/user' element={<User />} />
        </Routes>
      )}
    </>
  );
}

function LoadingScreen() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <FontAwesomeIcon icon={faSpinner} className='fa-spin' size='2x' />
    </div>
  );
}
