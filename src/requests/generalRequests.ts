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

type GetPlacesInformationRequestType = {
  ok: boolean;
  data: PlaceInformation[];
};

export function getPlacesInformationRequest() {
  return axiosInstance.get<GetPlacesInformationRequestType>(
    '/place/places-information'
  );
}

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
  return axiosInstance.post<ValidateTokenRequestType>(
    '/user/validate-token',
    payload
  );
}

export function getPlaceInformationRequest(payload: string) {
  return axiosInstance.post<PlaceInformation>(
    `place/place-information/${payload}`
  );
}
