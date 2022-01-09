// Modules
import { useContext, useEffect } from 'react';
import { faEye, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Classes
import {
  blackButton,
  blueButton,
  generalTitle,
  neutralButton,
} from '../utils/classes';

// Components
import Container from '../components/Container';
import { GeneralContext } from '../states/GeneralState';
import { PlaceInformation } from '../requests/generalRequests';

export default function Home() {
  //
  const { getPlacesInformation } = useContext(GeneralContext);

  useEffect(() => {
    getPlacesInformation();
  }, []);

  return (
    <Container>
      <div className='flex flex-row md:grid md:grid-cols-12 md:gap-6'>
        <PlacesInformationColumn />
        <CategoryInformationColumn />
      </div>
    </Container>
  );
}

function PlacesInformationColumn() {
  //
  const { loadingGetPlacesInformation } = useContext(GeneralContext);

  return (
    <div className='flex flex-col gap-6 md:col-start-1 md:col-end-8 lg:col-end-10'>
      <div className='px-6 py-4 bg-neutral-600 rounded'>
        <h2 className={generalTitle}>Lugares</h2>
      </div>
      {loadingGetPlacesInformation ? (
        <LoadingCard />
      ) : (
        <PlacesInformationContainer />
      )}
    </div>
  );
}

function CategoryInformationColumn() {
  //
  const { loadingGetPlacesInformation } = useContext(GeneralContext);

  return (
    <div className='hidden md:flex flex-col gap-6 md:col-start-8 md:col-end-13 lg:col-start-10'>
      <div className='px-6 py-4 bg-neutral-600 rounded'>
        <h2 className={generalTitle}>Categorias</h2>
      </div>
      {loadingGetPlacesInformation ? <LoadingCard /> : <CategoriesContainer />}
    </div>
  );
}

function LoadingCard() {
  //
  return (
    <div
      className='bg-white rounded px-6 py-4 flex justify-center items-center'
      style={{ minHeight: '65vh' }}
    >
      <FontAwesomeIcon icon={faSpinner} size='2x' className='fa-spin' />
    </div>
  );
}

function PlacesInformationContainer() {
  //
  const { placesInformation } = useContext(GeneralContext);

  return (
    <div className='flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6 bg-white'>
      {placesInformation.map((place, key: number) => (
        //@ts-ignore
        <PlaceElement place={place} key={key} />
      ))}
    </div>
  );
}

type PlaceElementProps = {
  place: PlaceInformation;
};

function PlaceElement({
  place: { title, description, rate },
}: PlaceElementProps) {
  //
  return (
    <div className='flex flex-col rounded'>
      <img
        className='rounded-t'
        src={
          'https://centralelectoral.ine.mx/wp-content/uploads/2021/01/1-2.jpg'
        }
      />
      <div className='rounded-b bg-gray-200 py-4 px-6'>
        <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
        <p className='mb-4'>{description}</p>
        <div className='flex gap-4'>
          <button className={blueButton} title='Agregar a favoritos'>
            <FontAwesomeIcon icon={faStar} />
          </button>
          <button className={neutralButton} title='Ver detalles'>
            Ver lugar
          </button>
          <button className={blackButton} title='Ver fotos del lugar'>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoriesContainer() {
  //
  return (
    <div className='bg-white rounded p-6 flex flex-col gap-6'>
      <CategoryElement />
      <CategoryElement />
      <CategoryElement />
    </div>
  );
}

function CategoryElement() {
  return (
    <div className='rounded bg-neutral-400 hover:bg-neutral-300 px-4 py-3 cursor-pointer'>
      <h4 className='font-semibold text-white'>Categoría 1</h4>
    </div>
  );
}
