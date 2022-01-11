// Modules
import { createContext, ReactNode, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

// Reducers
import GeneralReducer from '../reducers/GeneralReducer';

// Requests
import {
  getPlaceInformationRequest,
  getPlacesInformationRequest,
  GetPlacesInformationRequestType,
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
  // Places
  placeInformation: null,
  placesInformation: [],
  favoritePlacesInformation: [],
  categories: [],
  categorySelected: '',
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
  validateToken: function (payload: string) {},
  // Places functions
  getPlaceInformation: function (payload: string) {},
  getPlacesInformation: function () {},
  addPlaceToFavorites: function () {},
  removePlaceFromFavorites: function () {},
  setCategorySelected: function (payload: string) {},
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

  async function getPlacesInformation() {
    try {
      dispatch({ type: 'SET_LOADING_GET_PLACES_INFORMATION', payload: true });
      const { data } = await getPlacesInformationRequest();
      dispatch({
        type: 'SET_CATEGORIES_INFORMATION',
        payload: setCategories(data),
      });
      dispatch({ type: 'SET_PLACES_INFORMATION', payload: data });
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
      dispatch({ type: 'SET_CATEGORY_SELECTED', payload });
    } catch (error: any) {}
  }

  function addPlaceToFavorites() {
    try {
    } catch (error: any) {}
  }

  function removePlaceFromFavorites() {
    try {
    } catch (error: any) {}
  }

  const combinedFunctions = {
    signIn,
    signUp,
    validateToken,
    getPlaceInformation,
    getPlacesInformation,
    addPlaceToFavorites,
    removePlaceFromFavorites,
    setCategorySelected,
  };

  return (
    <GeneralContext.Provider value={{ ...state, ...combinedFunctions }}>
      {children}
    </GeneralContext.Provider>
  );
}
