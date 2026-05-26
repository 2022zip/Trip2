import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import CustomNavBar from '@/components/CustomNavBar';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const RecordsPage: React.FC = () => {
  const { currentUserId, role } = useAppStore((s) => ({ currentUserId: s.currentUserId, role: s.role }));

  return (
    <View className={styles.page}>
      <CustomNavBar title="记录" leftType="none" />
      <View className={styles.content}>
        <View className={styles.card}>
          <View className={styles.item} onClick={() => Taro.navigateTo({ url: '/pages/todayRecords/index' })}>
            <View className={styles.left}>
              <Text className={styles.title}>今日记录</Text>
              <Text className={styles.desc}>仅显示今天，不支持查看前天等历史日期</Text>
            </View>
            <Text className={styles.arrow}>›</Text>
          </View>
          <View
            className={styles.item}
            onClick={() => Taro.navigateTo({ url: `/pages/outworkDetail/index?employeeId=${currentUserId}` })}
          >
            <View className={styles.left}>
              <Text className={styles.title}>我的历史外勤明细</Text>
              <Text className={styles.desc}>默认最近一段出差单，可筛选日期区间</Text>
            </View>
            <Text className={styles.arrow}>›</Text>
          </View>
          {role === 'manager' && (
            <View className={styles.item} onClick={() => Taro.navigateTo({ url: '/pages/employeeList/index' })}>
              <View className={styles.left}>
                <Text className={styles.title}>员工出勤数据</Text>
                <Text className={styles.desc}>查看员工名单，进入对应人员出勤详情</Text>
              </View>
              <Text className={styles.arrow}>›</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default RecordsPage;
