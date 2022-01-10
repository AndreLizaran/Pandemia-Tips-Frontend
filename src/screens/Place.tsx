// Modules
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
// Components
import Container from '../components/Container';
import { GeneralContext } from '../states/GeneralState';
import { generalTitle } from '../utils/classes';

export default function Place() {
  //
  const { id } = useParams();
  const { getPlaceInformation } = useContext(GeneralContext);

  useEffect(() => {
    if (id) getPlaceInformation(id);
  }, [id]);

  return (
    <Container>
      <div className='flex flex-col gap-6 md:grid grid-cols-12'>
        <div className='flex flex-col md:col-start-1 md:col-end-8'>
          <div className='bg-neutral-600 rounded-t px-6 py-4'>
            <h2 className={generalTitle}>Nombre del lugar</h2>
          </div>
          <div className='p-6 bg-white rounded-b flex flex-col'>
            <img
              src={
                'https://centralelectoral.ine.mx/wp-content/uploads/2021/01/1-2.jpg'
              }
              className='rounded mb-4'
            />
            <h3 className='font-semibold'>Categorías</h3>
          </div>
        </div>
        <div className='flex flex-col md:col-start-8 md:col-end-13'>
          <div className='bg-neutral-600 rounded-t px-6 py-4'>
            <h2 className={generalTitle}>Tips</h2>
          </div>
          <div className='p-6 bg-white rounded-b'></div>
        </div>
      </div>
    </Container>
  );
}
