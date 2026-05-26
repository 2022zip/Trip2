import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import classnames from 'classnames';
import CustomNavBar from '@/components/CustomNavBar';
import { getEmployeeById, useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const { currentUserId, employees, role, addCheckIn } = useAppStore((s) => ({
    currentUserId: s.currentUserId,
    employees: s.employees,
    role: s.role,
    addCheckIn: s.addCheckIn
  }));

  const user = useMemo(() => getEmployeeById(employees, currentUserId), [employees, currentUserId]);
  const [timeText, setTimeText] = useState(() => dayjs().format('HH:mm:ss'));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeText(dayjs().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = useMemo(() => {
    const h = dayjs().hour();
    if (h < 11) return '早上好';
    if (h < 14) return '中午好';
    if (h < 18) return '下午好';
    return '晚上好';
  }, [timeText]);

  const roleLabel = role === 'manager' ? 'Manager' : 'Employee';

  return (
    <View className={styles.page}>
      <CustomNavBar title="外勤打卡" leftType="close" onLeftClick={() => Taro.showToast({ title: '原型演示', icon: 'none' })} />
      <View className={styles.content}>
        <View className={styles.userRow}>
          <View className={styles.userTopRow}>
            <Text className={styles.roleText}>{roleLabel}</Text>
          </View>
          <Text className={styles.userName}>
            {user?.name || '—'}，{greeting}
          </Text>
        </View>

        <View className={styles.actions}>
          <Button className={styles.actionBtn} onClick={() => Taro.navigateTo({ url: '/pages/todayRecords/index' })}>
            <Text className={styles.actionText}>查看今日记录</Text>
          </Button>
          <Button
            className={classnames(styles.actionBtn, styles.actionPrimary)}
            onClick={() => Taro.navigateTo({ url: '/pages/reportCreate/index' })}
          >
            <Text className={classnames(styles.actionText, styles.actionTextPrimary)}>写日报</Text>
          </Button>
        </View>

        <View className={styles.clockWrap}>
          <View
            className={styles.clockCircle}
            onClick={() => {
              addCheckIn({ employeeId: currentUserId });
              Taro.showToast({ title: '打卡成功（原型）', icon: 'success' });
            }}
          >
            <Text className={styles.clockTitle}>外勤打卡</Text>
            <Text className={styles.clockTime}>{timeText}</Text>
          </View>
        </View>

        <View className={styles.photoArea} onClick={() => Taro.showToast({ title: '拍照区（原型）', icon: 'none' })}>
          <Text className={styles.photoText}>拍照区</Text>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
