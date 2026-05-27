import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import styles from './index.module.scss';

export interface DateRangeModalProps {
  visible: boolean;
  startDate: string;
  endDate: string;
  onCancel: () => void;
  onConfirm: (payload: { startDate: string; endDate: string }) => void;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({ visible, startDate, endDate, onCancel, onConfirm }) => {
  const [localStart, setLocalStart] = useState(startDate);
  const [localEnd, setLocalEnd] = useState(endDate);

  const canConfirm = useMemo(() => {
    return !dayjs(localStart).isAfter(localEnd, 'day');
  }, [localEnd, localStart]);

  if (!visible) return null;

  return (
    <div className={styles.mask} onClick={onCancel}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>筛选日期区间</span>
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <span className={styles.label}>开始日期</span>
            <label className={styles.pickerBox}>
              <input
                className={styles.input}
                type="date"
                value={localStart}
                onChange={(e) => setLocalStart(e.target.value)}
              />
              <span className={styles.pickerText}>{localStart}</span>
            </label>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>结束日期</span>
            <label className={styles.pickerBox}>
              <input className={styles.input} type="date" value={localEnd} onChange={(e) => setLocalEnd(e.target.value)} />
              <span className={styles.pickerText}>{localEnd}</span>
            </label>
          </div>

          {!canConfirm && <span className={styles.hint}>开始日期不能晚于结束日期</span>}
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.btn} onClick={onCancel}>
            <span className={styles.btnText}>取消</span>
          </button>
          <button
            type="button"
            className={classnames(styles.btn, styles.btnPrimary, !canConfirm && styles.btnDisabled)}
            disabled={!canConfirm}
            onClick={() => onConfirm({ startDate: localStart, endDate: localEnd })}
          >
            <span className={classnames(styles.btnText, styles.btnTextPrimary)}>确定</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangeModal;
