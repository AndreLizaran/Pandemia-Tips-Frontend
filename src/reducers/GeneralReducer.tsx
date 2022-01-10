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
    default:
      return state;
  }
}
