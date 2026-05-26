import React, { useMemo, useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import dayjs from 'dayjs';
import CustomNavBar from '@/components/CustomNavBar';
import DateRangeModal from '@/components/DateRangeModal';
import {
  getAllRecordsByEmployeeId,
  getEmployeeById,
  getLatestTripByEmployeeId,
  useAppStore
} from '@/store/useAppStore';
import { groupRecordsByDate, isBetweenDates } from '@/utils/outwork';
import styles from './index.module.scss';

const OutworkDetailPage: React.FC = () => {
  const { employees, trips, dynamicRecords } = useAppStore((s) => ({
    employees: s.employees,
    trips: s.trips,
    dynamicRecords: s.dynamicRecords
  }));

  const employeeId = getCurrentInstance().router?.params?.employeeId || '';
  const employee = useMemo(() => getEmployeeById(employees, employeeId), [employeeId, employees]);
  const allRecords = useMemo(
    () => getAllRecordsByEmployeeId(trips, dynamicRecords, employeeId),
    [dynamicRecords, employeeId, trips]
  );

  const latestTrip = useMemo(() => getLatestTripByEmployeeId(trips, employeeId), [employeeId, trips]);

  const initialRange = useMemo(() => {
    if (latestTrip) return { startDate: latestTrip.startDate, endDate: latestTrip.endDate };
    if (allRecords.length > 0) {
      const dates = allRecords.map((r) => r.date).sort();
      return { startDate: dates[0], endDate: dates[dates.length - 1] };
    }
    const t = dayjs().format('YYYY-MM-DD');
    return { startDate: t, endDate: t };
  }, [allRecords, latestTrip]);

  const [range, setRange] = useState(initialRange);
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = useMemo(
    () => allRecords.filter((r) => isBetweenDates(r.date, range.startDate, range.endDate)),
    [allRecords, range.endDate, range.startDate]
  );
  const groups = useMemo(() => groupRecordsByDate(filtered), [filtered]);

  const rangeLabel = useMemo(() => {
    const s = dayjs(range.startDate).format('MM/DD');
    const e = dayjs(range.endDate).format('MM/DD');
    return `${s}–${e}`;
  }, [range.endDate, range.startDate]);

  return (
    <View className={styles.page}>
      <CustomNavBar title="外勤打卡" leftType="back" onLeftClick={() => Taro.navigateBack()} rightText="返回" onRightClick={() => Taro.navigateBack()} />
      <View className={styles.content}>
        <View className={styles.summaryCard}>
          <View className={styles.summaryMain}>
            <Text className={styles.summaryTitle}>{employee?.name || '—'} 出勤详情</Text>
            <Text className={styles.rangeText}>出差时间段：{rangeLabel}</Text>
          </View>
          <Text className={styles.filterBtn} onClick={() => setModalVisible(true)}>
            筛选
          </Text>
        </View>

        {groups.length === 0 ? (
          <Text className={styles.empty}>该区间暂无外勤记录</Text>
        ) : (
          groups.map((g) => (
            <View key={g.date} className={styles.groupCard}>
              <View className={styles.groupHeader}>
                <Text className={styles.groupDate}>{dayjs(g.date).format('MM/DD（ddd）')}</Text>
              </View>
              {g.records.map((r, idx) => (
                <View key={r.id} className={styles.item}>
                  <Text className={styles.itemLine1}>
                    {idx + 1}. {r.type}—{r.time}
                  </Text>
                  <Text className={styles.itemLine2}>地址：{r.address}</Text>
                </View>
              ))}
            </View>
          ))
        )}
      </View>

      <DateRangeModal
        visible={modalVisible}
        startDate={range.startDate}
        endDate={range.endDate}
        onCancel={() => setModalVisible(false)}
        onConfirm={(payload) => {
          setRange(payload);
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default OutworkDetailPage;
