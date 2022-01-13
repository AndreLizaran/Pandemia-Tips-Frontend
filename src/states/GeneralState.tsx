// Modules
import { createContext, ReactNode, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

// Reducers
import GeneralReducer from '../reducers/GeneralReducer';

// Requests
import {
  addPlaceToFavoritesRequest,
  getPlaceInformationRequest,
  getPlacesByCategory,
  getPlacesInformationRequest,
  GetPlacesInformationRequestType,
  removePlaceFromFavoritesRequest,
  signInUserRequest,
  signUpUserRequest,
  validateTokenRequest,
} from '../requests/generalRequests';

// Types
import { InitialStateType } from './GeneralState-types';

const initialState: InitialStateType = {
  // User
  token: '',
  displayName: '',
  favorites: [],
  // Places
  placeInformation: null,
  placesInformation: [],
  favoritePlacesInformation: [],
  categories: [],
  categorySelected: '',
  selectedPlaceImages: [],
  // Loadings user
  loadingSignInUser: false,
  loadingSignUpUser: false,
  loadingValidateToken: true,
  // Loading places
  loadingCategories: false,
  loadingGetPlaceInformation: false,
  loadingGetPlacesInformation: false,
};

export const GeneralContext = createContext({
  ...initialState,
  // User functions
  signIn: function (payload: { email: string; password: string }) {},
  signUp: function (payload: {
    displayName: string;
    email: string;
    password: string;
  }) {},
  signOut: function () {},
  validateToken: function (payload: string) {},
  // Places functions
  getPlaceInformation: function (payload: string) {},
  getPlacesInformation: function () {},
  addPlaceToFavorites: function (payload: string) {},
  removePlaceFromFavorites: function (payload: string) {},
  setCategorySelected: function (payload: string) {},
  setSelectedPlaceImages: function (payload: string[]) {},
});

type GeneralStateProps = {
  children: ReactNode;
};

export default function GeneralState({ children }: GeneralStateProps) {
  //
  const navigator = useNavigate();
  const [state, dispatch] = useReducer(GeneralReducer, initialState);

  async function signIn(payload: { email: string; password: string }) {
    try {
      dispatch({ type: 'SET_LOADING_SIGN_IN_USER', payload: true });
      const { data } = await signInUserRequest(payload);
      navigator('/');
      dispatch({ type: 'SET_USER_INFORMATION', payload: data });
      localStorage.setItem('pand-tips', data.token);
      dispatch({ type: 'SET_LOADING_SIGN_IN_USER', payload: false });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: 'SET_LOADING_SIGN_IN_USER', payload: false });
    }
  }

  async function signUp(payload: {
    displayName: string;
    email: string;
    password: string;
  }) {
    try {
      dispatch({ type: 'SET_LOADING_SIGN_UP_USER', payload: true });
      const { data } = await signUpUserRequest(payload);
      navigator('/');
      dispatch({ type: 'SET_USER_INFORMATION', payload: data });
      localStorage.setItem('pand-tips', data.token);
      dispatch({ type: 'SET_LOADING_SIGN_UP_USER', payload: false });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: 'SET_LOADING_SIGN_UP_USER', payload: false });
    }
  }

  async function validateToken(token: string) {
    if (token) {
      try {
        dispatch({ type: 'SET_LOADING_VALIDATE_TOKEN', payload: true });
        const { data } = await validateTokenRequest(token);
        dispatch({ type: 'SET_USER_INFORMATION', payload: data });
        localStorage.setItem('pand-tips', data.token);
        dispatch({ type: 'SET_LOADING_VALIDATE_TOKEN', payload: false });
      } catch (error: any) {
        console.log(error);
        dispatch({ type: 'SET_LOADING_VALIDATE_TOKEN', payload: false });
      }
    } else dispatch({ type: 'SET_LOADING_VALIDATE_TOKEN', payload: false });
  }

  function signOut() {
    navigator('/');
    localStorage.removeItem('pand-tips');
    dispatch({
      type: 'SET_USER_INFORMATION',
      payload: { displayName: '', token: '' },
    });
  }

  async function getPlacesInformation() {
    try {
      dispatch({ type: 'SET_LOADING_GET_PLACES_INFORMATION', payload: true });
      dispatch({ type: 'SET_LOADING_CATEGORIES', payload: true });
      const { data } = await getPlacesInformationRequest();
      dispatch({
        type: 'SET_CATEGORIES_INFORMATION',
        payload: setCategories(data),
      });
      dispatch({ type: 'SET_PLACES_INFORMATION', payload: data });
      dispatch({ type: 'SET_LOADING_CATEGORIES', payload: false });
      dispatch({ type: 'SET_LOADING_GET_PLACES_INFORMATION', payload: false });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: 'SET_LOADING_GET_PLACES_INFORMATION', payload: false });
    }
  }

  function setCategories(data: GetPlacesInformationRequestType) {
    let categories: string[] = [];
    data.map((place) => {
      place.categories.map((category) => {
        if (!categories.includes(category)) categories.push(category);
      });
    });
    return categories;
  }

  async function getPlaceInformation(payload: string) {
    try {
      dispatch({ type: 'SET_LOADING_GET_PLACE_INFORMATION', payload: true });
      const { data } = await getPlaceInformationRequest(payload);
      dispatch({ type: 'SET_PLACE_INFORMATION', payload: data });
      dispatch({ type: 'SET_LOADING_GET_PLACE_INFORMATION', payload: false });
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING_GET_PLACE_INFORMATION', payload: false });
    }
  }

  async function setCategorySelected(payload: string) {
    try {
      dispatch({ type: 'SET_LOADING_GET_PLACE_INFORMATION', payload: true });
      dispatch({ type: 'SET_CATEGORY_SELECTED', payload });
      const { data } = await getPlacesByCategory(payload);
      dispatch({ type: 'SET_PLACES_INFORMATION', payload: data });
      dispatch({ type: 'SET_LOADING_GET_PLACE_INFORMATION', payload: false });
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING_GET_PLACE_INFORMATION', payload: false });
    }
  }

  async function addPlaceToFavorites(payload: string) {
    try {
      await addPlaceToFavoritesRequest(payload, state.token);
      const newFavorites = [...state.favorites, payload];
      dispatch({ type: 'ADD_PLACE_TO_FAVORITES', payload: newFavorites });
    } catch (error: any) {}
  }

  async function removePlaceFromFavorites(payload: string) {
    try {
      await removePlaceFromFavoritesRequest(payload, state.token);
      const newFavorites = state.favorites.filter((fav) => {
        if (fav !== payload) return fav;
      });
      dispatch({ type: 'REMOVE_PLACE_FROM_FAVORITES', payload: newFavorites });
    } catch (error: any) {}
  }

  function setSelectedPlaceImages(payload: string[]) {
    dispatch({ type: 'SET_SELECTED_PLACE_IMAGES', payload });
  }

  const combinedFunctions = {
    signIn,
    signUp,
    signOut,
    validateToken,
    getPlaceInformation,
    getPlacesInformation,
    addPlaceToFavorites,
    removePlaceFromFavorites,
    setCategorySelected,
    setSelectedPlaceImages,
  };

  return (
    <GeneralContext.Provider value={{ ...state, ...combinedFunctions }}>
      {children}
    </GeneralContext.Provider>
  );
}
