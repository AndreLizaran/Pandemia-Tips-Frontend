export type InitialStateType = {
  // User
  token: string;
  displayName: string;
  // Places
  placesInformation: PlaceInformation[];
  favoritePlacesInformation: PlaceInformation[];
  // Loading user
  loadingSignInUser: boolean;
  loadingSignUpUser: boolean;
  loadingValidateToken: boolean;
  // Loading places
  loadingCategories: boolean;
  loadingGetPlaceInformation: boolean;
  loadingGetPlacesInformation: boolean;
};

type PlaceInformation = {};
