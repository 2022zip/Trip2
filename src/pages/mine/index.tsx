import React, { useMemo } from 'react';
import { View, Text, Button } from '@tarojs/components';
import classnames from 'classnames';
import CustomNavBar from '@/components/CustomNavBar';
import { getEmployeeById, useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const { role, setRole, employees, currentUserId } = useAppStore((s) => ({
    role: s.role,
    setRole: s.setRole,
    employees: s.employees,
    currentUserId: s.currentUserId
  }));

  const user = useMemo(() => getEmployeeById(employees, currentUserId), [currentUserId, employees]);

  return (
    <View className={styles.page}>
      <CustomNavBar title="我的" leftType="none" />
      <View className={styles.content}>
        <View className={styles.card}>
          <Text className={styles.title}>角色切换（原型演示）</Text>
          <Text className={styles.desc}>
            员工/主管的主要差异：主管在“记录”页会多一个“员工出勤数据”入口（员工名单→明细）。
          </Text>

          <View className={styles.seg}>
            <Button
              className={classnames(styles.segBtn, role === 'employee' && styles.segActive)}
              onClick={() => setRole('employee')}
            >
              <Text className={classnames(styles.segText, role === 'employee' && styles.segTextActive)}>员工</Text>
            </Button>
            <Button
              className={classnames(styles.segBtn, role === 'manager' && styles.segActive)}
              onClick={() => setRole('manager')}
            >
              <Text className={classnames(styles.segText, role === 'manager' && styles.segTextActive)}>主管</Text>
            </Button>
          </View>

          <View className={styles.metaRow}>
            <Text className={styles.metaLine}>当前用户：{user?.name || '—'}</Text>
            <Text className={styles.metaLine}>部门：{user?.deptName || '—'}</Text>
            <Text className={styles.metaLine}>当前角色：{role === 'manager' ? '主管' : '员工'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MinePage;
