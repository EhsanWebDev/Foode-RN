import {errorType, loadingStates} from '../../../../store/types';

export type galleryType = {
  data: [];
  status: loadingStates;
  error: errorType;
};
export type storeTypes = {
  gallery: galleryType;
};
