import React, { useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import CustomNavBar from '@/components/CustomNavBar';
import { getAllRecordsByEmployeeId, useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const TodayRecordsPage: React.FC = () => {
  const { currentUserId, trips, dynamicRecords } = useAppStore((s) => ({
    currentUserId: s.currentUserId,
    trips: s.trips,
    dynamicRecords: s.dynamicRecords
  }));

  const today = dayjs().format('YYYY-MM-DD');
  const list = useMemo(() => {
    const all = getAllRecordsByEmployeeId(trips, dynamicRecords, currentUserId);
    return all
      .filter((r) => r.date === today)
      .sort((a, b) => (dayjs(`${a.date} ${a.time}`).isAfter(`${b.date} ${b.time}`) ? 1 : -1));
  }, [currentUserId, dynamicRecords, today, trips]);

  return (
    <View className={styles.page}>
      <CustomNavBar title="今日记录" leftType="back" onLeftClick={() => Taro.navigateBack()} rightText="返回" onRightClick={() => Taro.navigateBack()} />
      <View className={styles.content}>
        <Text className={styles.tip}>仅显示今日数据，不支持查看前天等历史日期</Text>
        {list.length === 0 ? (
          <Text className={styles.empty}>今日暂无外勤记录</Text>
        ) : (
          <View className={styles.card}>
            {list.map((r, idx) => (
              <View key={r.id} className={styles.item}>
                <Text className={styles.line1}>
                  {idx + 1}. {r.type}—{r.time}
                </Text>
                <Text className={styles.line2}>地址：{r.address}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default TodayRecordsPage;
