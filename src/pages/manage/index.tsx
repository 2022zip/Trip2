import React, { useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import CustomNavBar from '@/components/CustomNavBar';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const ManagePage: React.FC = () => {
  const { role, currentUserId } = useAppStore((s) => ({
    role: s.role,
    currentUserId: s.currentUserId
  }));

  const items = useMemo(() => {
    const base = [
      {
        key: 'my',
        title: '个人外勤明细表',
        desc: '默认展示最近一段出差单，可筛选日期区间',
        onClick: () => Taro.navigateTo({ url: `/pages/outworkDetail/index?employeeId=${currentUserId}` })
      }
    ];

    if (role === 'manager') {
      return base.concat([
        {
          key: 'subs',
          title: '下属外勤明细表',
          desc: '选择下属后查看该员工的外勤明细',
          onClick: () => Taro.navigateTo({ url: '/pages/employeeList/index' })
        }
      ]);
    }

    return base;
  }, [currentUserId, role]);

  return (
    <View className={styles.page}>
      <CustomNavBar title="管理" leftType="back" onLeftClick={() => Taro.navigateBack()} />
      <View className={styles.content}>
        <Text className={styles.sectionTitle}>功能入口</Text>
        <View className={styles.card}>
          {items.map((it) => (
            <View key={it.key} className={styles.item} onClick={it.onClick}>
              <View className={styles.itemLeft}>
                <Text className={styles.itemTitle}>{it.title}</Text>
                <Text className={styles.itemDesc}>{it.desc}</Text>
              </View>
              <Text className={styles.arrow}>›</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ManagePage;

