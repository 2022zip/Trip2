import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { TOAST_EVENT, type ToastType } from '@/utils/toast';
import styles from './index.module.scss';

interface ToastState {
  message: string;
  type: ToastType;
}

const Toast: React.FC = () => {
  const [state, setState] = useState<ToastState | null>(null);

  useEffect(() => {
    let timer: number | undefined;

    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<ToastState>).detail;
      setState(detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setState(null), 1600);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToast);
      window.clearTimeout(timer);
    };
  }, []);

  if (!state) return null;

  return (
    <div className={styles.root}>
      <div className={classNames(styles.toast, state.type === 'success' && styles.success)}>{state.message}</div>
    </div>
  );
};

export default Toast;
