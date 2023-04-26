import toast from 'react-native-toast-message';

type ToastTypes = {
  message?: string;
  type?: 'success' | 'info' | 'error';
};

const showToast = ({message, type = 'error'}: ToastTypes) => {
  toast.show({
    type,
    text1: message,
  });
};

export default showToast;
