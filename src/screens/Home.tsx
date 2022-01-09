// Modules
import { useContext, useEffect } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Classes
import { generalTitle } from '../utils/classes';

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
      <div className='flex md:grid md:grid-cols-12 md:gap-6'>
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
    <div className='flex flex-col gap-6 md:col-start-1 md:col-end-10'>
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
    <div className='flex flex-col gap-6 md:col-start-10 md:col-end-13'>
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
    <div className='flex flex-col md:grid md:grid-cols-3 gap-6 p-6 bg-white'>
      {placesInformation.map((place, key: number) => (
        //@ts-ignore
        <CardInformation place={place} key={key} />
      ))}
    </div>
  );
}

type CardInformationProps = {
  place: PlaceInformation;
};

function CardInformation({
  place: { title, description, rate },
}: CardInformationProps) {
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
        <h3 className='text-md font-semibold'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function CategoriesContainer() {
  //
  return (
    <div className='bg-white rounded p-6 flex flex-col gap-6'>
      <div className='rounded bg-neutral-400 px-4 py-3'>
        <h4 className='font-semibold text-white'>Categoría 1</h4>
      </div>
      <div className='rounded bg-neutral-400 px-4 py-3'>
        <h4 className='font-semibold text-white'>Categoría 2</h4>
      </div>
      <div className='rounded bg-neutral-400 px-4 py-3'>
        <h4 className='font-semibold text-white'>Categoría 3</h4>
      </div>
    </div>
  );
}
