import toast from "react-hot-toast";

const TOAST_ID = "studia-toast";

const toastSuccess = (message) => {
    toast.success(message, {
        id: TOAST_ID,
    });
};

const toastError = (message) => {
    toast.error(message, {
        id: TOAST_ID,
    });
};

const toastLoading = (message) => {
    toast.loading(message, {
        id: TOAST_ID,
    });
};

const toastDismiss = () => {
    toast.dismiss(TOAST_ID);
};

const appToast = {
    success: toastSuccess,
    error: toastError,
    loading: toastLoading,
    dismiss: toastDismiss,
};

export default appToast;