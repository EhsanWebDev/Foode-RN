import showToast from './toast';

type errorTypes = {
  message?: string;
  status?: number;
};

export const handleApiErrors = (error: errorTypes) => {
  const {message} = error || {};

  showToast({message});
};

export const truncateString = (str = '', limit = 14) => {
  if (typeof str !== 'string') {
    return '';
  }
  if (str.length > limit) {
    return str.substring(0, limit) + '...';
  } else {
    return str;
  }
};
