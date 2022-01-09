// Types
import { InitialStateType } from '../states/GeneralState-types';
import { PlaceInformation } from '../requests/generalRequests';

type ActionType =
  | {
      type: 'SET_LOADING_GET_PLACES_INFORMATION';
      payload: boolean;
    }
  | {
      type: 'SET_PLACES_INFORMATION';
      payload: PlaceInformation[];
    };

export default function GeneralReducer(
  state: InitialStateType,
  action: ActionType
): InitialStateType {
  //
  switch (action.type) {
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
    default:
      return state;
  }
}
