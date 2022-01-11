// Modules
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';

// Components
import Container from '../components/Container';
import { GeneralContext } from '../states/GeneralState';
import { generalTitle, yellowButton } from '../utils/classes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';

export default function Place() {
  //
  const { id } = useParams();
  const { getPlaceInformation, placeInformation, loadingGetPlaceInformation } =
    useContext(GeneralContext);

  useEffect(() => {
    if (id) getPlaceInformation(id);
  }, [id]);

  if (loadingGetPlaceInformation) {
    return (
      <Container>
        <div
          className='w-full flex justify-center items-center'
          style={{ height: '80vh' }}
        >
          <FontAwesomeIcon icon={faSpinner} className='fa-spin' size='2x' />
        </div>
      </Container>
    );
  } else if (placeInformation !== null) {
    return (
      <Container>
        <div className='flex flex-col gap-6 md:grid grid-cols-12'>
          <div className='flex flex-col md:col-start-1 md:col-end-8'>
            <div className='bg-neutral-600 rounded-t px-6 py-4 flex justify-between items-center'>
              <h2 className={generalTitle}>{placeInformation.title}</h2>
              <button className={yellowButton}>
                <FontAwesomeIcon icon={faStar} />
              </button>
            </div>
            <div className='p-6 bg-white rounded-b flex flex-col'>
              <img
                src={
                  'https://centralelectoral.ine.mx/wp-content/uploads/2021/01/1-2.jpg'
                }
                className='rounded mb-4 cursor-pointer'
              />
              <h3 className='font-semibold'>Descripción</h3>
              <p className='mb-4'>{placeInformation.description}</p>
              <h3 className='font-semibold'>Dirección</h3>
              <p className='mb-4'>{placeInformation.address}</p>
              <h3 className='font-semibold mb-2'>Categorías</h3>
              <CategoriesContainer categories={placeInformation.categories} />
              <h3 className='font-semibold mb-2 mt-4'>Calificación</h3>
              <RateContainer rate={placeInformation.rate} />
            </div>
          </div>
          <div className='flex flex-col md:col-start-8 md:col-end-13'>
            <div className='bg-neutral-600 rounded-t px-6 py-4'>
              <h2 className={generalTitle}>Tips</h2>
            </div>
            <div className='p-6 bg-white rounded-b'>
              <TipsContainer tips={placeInformation.tips} />
            </div>
          </div>
        </div>
      </Container>
    );
  } else {
    return <></>;
  }
}

type CategoriesContainerProps = {
  categories: string[];
};

function CategoriesContainer({ categories }: CategoriesContainerProps) {
  return (
    <div className='flex gap-4'>
      {categories.map((category) => (
        <span
          className='px-4 py-2 rounded bg-neutral-200 hover:bg-neutral-100 cursor-pointer'
          key={category}
        >
          {category}
        </span>
      ))}
    </div>
  );
}

type TipsContainerProps = {
  tips: string[];
};

function TipsContainer({ tips }: TipsContainerProps) {
  return (
    <ul className='flex flex-col xl:grid xl:grid-cols-2 gap-6'>
      {tips.map((tip, key) => (
        <li key={key} className='px-4 py-2 rounded bg-neutral-200'>
          {tip}
        </li>
      ))}
    </ul>
  );
}

type RateContainerProps = {
  rate: number;
};

function RateContainer({ rate }: RateContainerProps) {
  if (rate === 1) {
    return <FontAwesomeIcon icon={faStar} className='text-yellow-300' />;
  } else if (rate === 1.5) {
    return <FontAwesomeIcon icon={faStar} className='text-yellow-300' />;
  } else if (rate === 2) {
    return (
      <div className='flex gap-4'>
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
      </div>
    );
  } else if (rate === 2.5) {
    return (
      <div className='flex gap-4'>
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
      </div>
    );
  } else if (rate === 3) {
    return (
      <div className='flex gap-4'>
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
      </div>
    );
  } else if (rate === 3.5) {
    return (
      <div className='flex gap-4'>
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
      </div>
    );
  } else if (rate === 4) {
    return (
      <div className='flex gap-4'>
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
      </div>
    );
  } else if (rate === 4.5) {
    return (
      <div className='flex gap-4'>
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
      </div>
    );
  } else if (rate === 5) {
    return (
      <div className='flex gap-4'>
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
        <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
      </div>
    );
  } else {
    return <></>;
  }
}
