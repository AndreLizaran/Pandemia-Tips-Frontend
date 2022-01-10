// Modules
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Components
import Container from '../components/Container';

// Contexts
import { GeneralContext } from '../states/GeneralState';

export default function User() {
  //
  const { token } = useContext(GeneralContext);

  if (!token) return <Navigate to='/sign-in' />;
  else {
    return (
      <Container>
        <div className='w-full sm:w-8/12 lg:w-6/12 xl:w-4/12 flex flex-col items-center'>
          <h1>Userrr</h1>
        </div>
      </Container>
    );
  }
}
