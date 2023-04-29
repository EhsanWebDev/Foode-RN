import {errorType, loadingStates} from '../../../../store/types';

export type galleryType = {
  data: [];
  status: loadingStates;
  error: errorType;
};
export type menuType = {
  data: [];
  status: loadingStates;
  error: errorType;
};
export type productDetailsType = {
  data: {};
  status: loadingStates;
  error: errorType;
};
export type storeTypes = {
  gallery: galleryType;
  menu: menuType;
  product: productDetailsType;
};
