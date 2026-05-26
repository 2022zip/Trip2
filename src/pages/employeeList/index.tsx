import React, { useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import CustomNavBar from '@/components/CustomNavBar';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const EmployeeListPage: React.FC = () => {
  const { employees } = useAppStore((s) => ({
    employees: s.employees
  }));

  const list = useMemo(() => employees, [employees]);

  return (
    <View className={styles.page}>
      <CustomNavBar title="员工名单" leftType="back" onLeftClick={() => Taro.navigateBack()} rightText="返回" onRightClick={() => Taro.navigateBack()} />
      <View className={styles.content}>
        <View className={styles.card}>
          {list.map((e) => (
            <View
              key={e.id}
              className={styles.row}
              onClick={() => Taro.navigateTo({ url: `/pages/outworkDetail/index?employeeId=${e.id}` })}
            >
              <Text className={styles.name}>{e.name}</Text>
              <Text className={styles.arrow}>›</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default EmployeeListPage;
