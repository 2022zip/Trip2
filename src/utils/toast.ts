export type ToastType = 'info' | 'success';

export const TOAST_EVENT = 'triplist:toast';

export const showToast = (message: string, type: ToastType = 'info') => {
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: { message, type }
    })
  );
};
