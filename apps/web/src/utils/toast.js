import toast from "react-hot-toast";

const TOAST_ID = "stady-toast";

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

const toastWarning = (message) => {
    toast(message, {
        id: TOAST_ID,
        icon: "⚠️",
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
    warning: toastWarning,
    loading: toastLoading,
    dismiss: toastDismiss,
};

export default appToast;