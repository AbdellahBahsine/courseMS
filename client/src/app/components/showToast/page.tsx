import { toast } from 'react-toastify';

export const showErrorToast = (message: string) => {

  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: '#f44336',
      color: '#fff',
      borderRadius: '5px',
    },
  });
};

export const showSuccessToast = (message: string) => {

  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: '#4caf50',
      color: '#fff',
      borderRadius: '5px',
    },
  });
};