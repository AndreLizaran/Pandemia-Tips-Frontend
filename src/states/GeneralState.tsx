// Modules
import { createContext, ReactNode, useReducer } from 'react';

// Reducers
import GeneralReducer from '../reducers/GeneralReducer';

// Requests
import { getPlacesInformationRequest } from '../requests/generalRequests';

// Types
import { InitialStateType } from './GeneralState-types';

const initialState: InitialStateType = {
  // User
  token: '',
  displayName: '',
  // Places
  placesInformation: [],
  favoritePlacesInformation: [],
  // Loadings user
  loadingSignInUser: false,
  loadingSignUpUser: false,
  loadingValidatingToken: true,
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
  validateToken: function (payload: { token: string }) {},
  // Places functions
  getPlacesInformation: function () {},
  getPlaceInformation: function () {},
  addPlaceToFavorites: function () {},
  removePlaceFromFavorites: function () {},
});

type GeneralStateProps = {
  children: ReactNode;
};
export default function GeneralState({ children }: GeneralStateProps) {
  //
  const [state, dispatch] = useReducer(GeneralReducer, initialState);

  function signIn(payload: { email: string; password: string }) {
    try {
    } catch (error: any) {}
  }

  function signUp(payload: {
    displayName: string;
    email: string;
    password: string;
  }) {
    try {
    } catch (error: any) {}
  }

  function validateToken(payload: { token: string }) {
    try {
    } catch (error: any) {}
  }

  function getPlaceInformation() {
    try {
    } catch (error: any) {}
  }

  async function getPlacesInformation() {
    try {
      dispatch({ type: 'SET_LOADING_GET_PLACES_INFORMATION', payload: true });
      const {
        data: { data },
      } = await getPlacesInformationRequest();
      dispatch({ type: 'SET_PLACES_INFORMATION', payload: data });
      dispatch({ type: 'SET_LOADING_GET_PLACES_INFORMATION', payload: false });
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
  };

  return (
    <GeneralContext.Provider value={{ ...state, ...combinedFunctions }}>
      {children}
    </GeneralContext.Provider>
  );
}
