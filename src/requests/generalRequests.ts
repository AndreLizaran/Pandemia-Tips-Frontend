// Axios instance
import axiosInstance from '../utils/axios';

export type PlaceInformation = {
  description: string;
  title: string;
  rate: number;
  images: string[];
  categories: string[];
};

type getPlacesInformationRequestType = {
  ok: boolean;
  data: PlaceInformation[];
};

export function getPlacesInformationRequest() {
  return axiosInstance.get<getPlacesInformationRequestType>(
    '/place/places-information'
  );
}
