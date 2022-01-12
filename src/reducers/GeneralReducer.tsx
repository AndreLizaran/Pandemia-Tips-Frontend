// Types
import { InitialStateType } from '../states/GeneralState-types';
import {
  PlaceInformation,
  SignInRequestType,
} from '../requests/generalRequests';

type ActionType =
  | {
      type: 'SET_LOADING_GET_PLACE_INFORMATION';
      payload: boolean;
    }
  | {
      type: 'SET_LOADING_GET_PLACES_INFORMATION';
      payload: boolean;
    }
  | {
      type: 'SET_PLACES_INFORMATION';
      payload: PlaceInformation[];
    }
  | {
      type: 'SET_PLACE_INFORMATION';
      payload: PlaceInformation;
    }
  | {
      type: 'SET_LOADING_SIGN_IN_USER';
      payload: boolean;
    }
  | {
      type: 'SET_LOADING_SIGN_UP_USER';
      payload: boolean;
    }
  | {
      type: 'SET_LOADING_VALIDATE_TOKEN';
      payload: boolean;
    }
  | {
      type: 'SET_USER_INFORMATION';
      payload: SignInRequestType;
    }
  | {
      type: 'SET_CATEGORIES_INFORMATION';
      payload: string[];
    }
  | {
      type: 'SET_CATEGORY_SELECTED';
      payload: string;
    }
  | {
      type: 'SET_LOADING_CATEGORIES';
      payload: boolean;
    }
  | {
      type: 'ADD_PLACE_TO_FAVORITES';
      payload: string[];
    }
  | {
      type: 'REMOVE_PLACE_FROM_FAVORITES';
      payload: string[];
    }
  | {
      type: 'SET_SELECTED_PLACCE_IMAGES';
      payload: string[];
    };

export default function GeneralReducer(
  state: InitialStateType,
  action: ActionType
): InitialStateType {
  //
  switch (action.type) {
    case 'SET_LOADING_GET_PLACE_INFORMATION':
      return {
        ...state,
        loadingGetPlacesInformation: action.payload,
      };
    case 'SET_LOADING_GET_PLACES_INFORMATION':
      return {
        ...state,
        loadingGetPlacesInformation: action.payload,
      };
    case 'SET_PLACES_INFORMATION':
      return {
        ...state,
        placesInformation: action.payload,
      };
    case 'SET_LOADING_SIGN_IN_USER':
      return {
        ...state,
        loadingSignInUser: action.payload,
      };
    case 'SET_LOADING_SIGN_UP_USER':
      return {
        ...state,
        loadingSignUpUser: action.payload,
      };
    case 'SET_USER_INFORMATION':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_LOADING_VALIDATE_TOKEN':
      return {
        ...state,
        loadingValidateToken: action.payload,
      };
    case 'SET_PLACE_INFORMATION':
      return {
        ...state,
        placeInformation: action.payload,
      };
    case 'SET_CATEGORIES_INFORMATION':
      return {
        ...state,
        categories: action.payload,
      };
    case 'SET_CATEGORY_SELECTED':
      return {
        ...state,
        categorySelected: action.payload,
      };
    case 'SET_LOADING_CATEGORIES':
      return {
        ...state,
        loadingCategories: action.payload,
      };
    case 'ADD_PLACE_TO_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    case 'REMOVE_PLACE_FROM_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    case 'SET_SELECTED_PLACCE_IMAGES':
      return {
        ...state,
        selectedPlaceImages: action.payload,
      };
    default:
      return state;
  }
}
