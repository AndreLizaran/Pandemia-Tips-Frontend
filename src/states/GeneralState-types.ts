export type InitialStateType = {
  // User
  token: string;
  displayName: string;
  // Places
  placeInformation: PlaceInformation | null;
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

type PlaceInformation = {
  address: string;
  categories: string[];
  description: string;
  images: string[];
  rate: number;
  tips: string[];
  title: string;
  _id: string;
};
