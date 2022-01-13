// Modules
import { useContext, useEffect } from 'react';
import {
  faEye,
  faSpinner,
  faTimes,
  faStarHalfAlt,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageViewer from 'react-simple-image-viewer';

// Classes
import {
  blueButton,
  generalTitle,
  neutralButton,
  redButton,
  yellowButton,
} from '../utils/classes';

// Components
import Container from '../components/Container';
import { GeneralContext } from '../states/GeneralState';
import { PlaceInformation } from '../requests/generalRequests';
import { NavLink } from 'react-router-dom';

export default function Home() {
  //
  const { getPlacesInformation, selectedPlaceImages, setSelectedPlaceImages } =
    useContext(GeneralContext);

  useEffect(() => {
    getPlacesInformation();
  }, []);

  return (
    <>
      <Container>
        <div className='flex flex-col md:grid md:grid-cols-12 gap-6 w-full'>
          <PlacesInformationColumn />
          <CategoryInformationColumn />
        </div>
      </Container>
      {selectedPlaceImages.length > 0 && (
        <ImageViewer
          src={selectedPlaceImages}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={() => setSelectedPlaceImages([])}
        />
      )}
    </>
  );
}

function PlacesInformationColumn() {
  //
  const { loadingGetPlacesInformation, categorySelected, setCategorySelected } =
    useContext(GeneralContext);

  return (
    <div className='flex flex-col md:col-start-1 md:col-end-9 w-full'>
      <div className='px-6 py-4 bg-neutral-600 rounded-t flex justify-between items-center'>
        <h2 className={generalTitle}>
          {categorySelected ? categorySelected : 'Lugares'}
        </h2>
        {categorySelected && (
          <button
            className={redButton}
            onClick={() => setCategorySelected('any')}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
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
  const { loadingCategories } = useContext(GeneralContext);

  return (
    <div className='flex flex-col md:col-start-9 md:col-end-13'>
      <div className='px-6 py-4 bg-neutral-600 rounded-t'>
        <h2 className={generalTitle}>Categorias</h2>
      </div>
      {loadingCategories ? <LoadingCard /> : <CategoriesContainer />}
    </div>
  );
}

function LoadingCard() {
  //
  return (
    <div
      className='bg-white rounded-b px-6 py-4 flex justify-center items-center'
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
    <div className='flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-6 p-6 bg-white rounded-b'>
      {placesInformation.map((place, key: number) => (
        //@ts-ignore
        <PlaceElement place={place} key={place._id} />
      ))}
    </div>
  );
}

type PlaceElementProps = {
  place: PlaceInformation;
};

function PlaceElement({
  place: { title, description, _id, images },
}: PlaceElementProps) {
  //
  const {
    favorites,
    addPlaceToFavorites,
    removePlaceFromFavorites,
    setSelectedPlaceImages,
  } = useContext(GeneralContext);

  return (
    <div className='flex flex-col rounded'>
      <img className='rounded-t' src={images[0]} />
      <div className='rounded-b bg-gray-200 py-4 px-6'>
        <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
        <p className='mb-4'>{description}</p>
        <div className='flex gap-4'>
          <button
            className={yellowButton}
            title='Agregar a favoritos'
            onClick={() =>
              favorites.includes(_id)
                ? removePlaceFromFavorites(_id)
                : addPlaceToFavorites(_id)
            }
          >
            {favorites.includes(_id) ? (
              <FontAwesomeIcon icon={faStar} />
            ) : (
              <FontAwesomeIcon icon={faStarEmpty} />
            )}
          </button>
          <NavLink to={`/place/${_id}`}>
            <button className={neutralButton} title='Ver detalles'>
              Ver lugar
            </button>
          </NavLink>
          <button
            className={blueButton}
            title='Ver fotos del lugar'
            onClick={() => setSelectedPlaceImages(images)}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoriesContainer() {
  //
  const { categories } = useContext(GeneralContext);

  return (
    <div className='bg-white rounded-b p-6 flex flex-col xl:grid xl:grid-cols-2 gap-6'>
      {categories.map((category) => (
        <CategoryElement category={category} key={category} />
      ))}
    </div>
  );
}

function CategoryElement({ category }: { category: string }) {
  const { setCategorySelected, categorySelected } = useContext(GeneralContext);

  return (
    <div
      className={`rounded px-4 py-3 cursor-pointer ${
        category === categorySelected
          ? 'bg-neutral-600 hover:bg-neutral-500'
          : 'bg-neutral-400 hover:bg-neutral-300'
      }`}
      onClick={() => setCategorySelected(category)}
    >
      <h4 className='font-semibold text-white'>{category}</h4>
    </div>
  );
}
