import showToast from './toast';

type errorTypes = {
  message?: string;
  status?: number;
};

export const handleApiErrors = (error: errorTypes) => {
  const {message} = error || {};

  showToast({message});
};
