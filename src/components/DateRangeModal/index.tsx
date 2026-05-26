import React, { useMemo, useState } from 'react';
import { View, Text, Picker, Button } from '@tarojs/components';
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
    <View className={styles.mask} onClick={onCancel}>
      <View className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <View className={styles.header}>
          <Text className={styles.title}>筛选日期区间</Text>
        </View>

        <View className={styles.body}>
          <View className={styles.row}>
            <Text className={styles.label}>开始日期</Text>
            <Picker mode="date" value={localStart} onChange={(e) => setLocalStart(String(e.detail.value))}>
              <View className={styles.pickerBox}>
                <Text className={styles.pickerText}>{localStart}</Text>
              </View>
            </Picker>
          </View>

          <View className={styles.row}>
            <Text className={styles.label}>结束日期</Text>
            <Picker mode="date" value={localEnd} onChange={(e) => setLocalEnd(String(e.detail.value))}>
              <View className={styles.pickerBox}>
                <Text className={styles.pickerText}>{localEnd}</Text>
              </View>
            </Picker>
          </View>

          {!canConfirm && <Text className={styles.hint}>开始日期不能晚于结束日期</Text>}
        </View>

        <View className={styles.footer}>
          <Button className={styles.btn} onClick={onCancel}>
            <Text className={styles.btnText}>取消</Text>
          </Button>
          <Button
            className={classnames(styles.btn, styles.btnPrimary, !canConfirm && styles.btnDisabled)}
            disabled={!canConfirm}
            onClick={() => onConfirm({ startDate: localStart, endDate: localEnd })}
          >
            <Text className={classnames(styles.btnText, styles.btnTextPrimary)}>确定</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default DateRangeModal;
