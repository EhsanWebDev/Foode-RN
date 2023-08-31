import toast from 'react-native-toast-message';

type ToastTypes = {
  message?: string;
  type?: 'success' | 'info' | 'error';
  position?: 'top' | 'bottom';
  visibilityTime?: number;
};

const showToast = ({
  message,
  position = 'bottom',
  type = 'error',
  ...rest
}: ToastTypes) => {
  toast.show({
    type,
    text1: message,
    position,
    ...rest,
  });
};

export default showToast;
