import toast from 'react-native-toast-message';

type ToastTypes = {
  message?: string;
  heading?: string;
  type?: 'success' | 'info' | 'error';
  position?: 'top' | 'bottom';
  visibilityTime?: number;
};

const showToast = ({
  message,
  heading = 'Some',
  position = 'bottom',
  type = 'error',
  ...rest
}: ToastTypes) => {
  toast.show({
    type,
    text1: message,
    // text2: message,
    position,
    ...rest,
  });
};

export default showToast;
