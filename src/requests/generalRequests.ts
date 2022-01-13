// Axios instance
import axiosInstance from '../utils/axios';

export type PlaceInformation = {
  _id: string;
  description: string;
  title: string;
  rate: number;
  images: string[];
  categories: string[];
  tips: string[];
  address: string;
};

export type SignInRequestType = {
  displayName: string;
  token: string;
};

type SignInUserRequestProps = {
  email: string;
  password: string;
};

export function signInUserRequest(payload: SignInUserRequestProps) {
  return axiosInstance.post<SignInRequestType>('/user/sign-in', payload);
}

type SignUpRequestType = {
  displayName: string;
  token: string;
};

type SignUpUserRequestProps = {
  displayName: string;
  email: string;
  password: string;
};

export function signUpUserRequest(payload: SignUpUserRequestProps) {
  return axiosInstance.post<SignUpRequestType>('/user/sign-up', payload);
}

type ValidateTokenRequestType = {
  displayName: string;
  token: string;
};

export function validateTokenRequest(payload: string) {
  return axiosInstance.get<ValidateTokenRequestType>('/user/validate-token', {
    headers: { Authorization: `Bearer ${payload}` },
  });
}

// Places

export type GetPlacesInformationRequestType = PlaceInformation[];

export function getPlacesInformationRequest() {
  return axiosInstance.get<GetPlacesInformationRequestType>('/place');
}

export function getPlaceInformationRequest(payload: string) {
  return axiosInstance.get<PlaceInformation>(
    `/place/place-information/${payload}`
  );
}

export function getPlacesByCategory(payload: string) {
  return axiosInstance.get<GetPlacesInformationRequestType>(
    `/place/category/${payload}`
  );
}

export function addPlaceToFavoritesRequest(id: string, payload: string) {
  return axiosInstance.get<any>(`/place/add-favorite/${id}`, {
    headers: { Authorization: `Bearer ${payload}` },
  });
}

export function removePlaceFromFavoritesRequest(id: string, payload: string) {
  return axiosInstance.get<any>(`/place/remove-favorite/${id}`, {
    headers: { Authorization: `Bearer ${payload}` },
  });
}
