import React, { useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';

export type NavLeftType = 'none' | 'close' | 'back';

export interface CustomNavBarProps {
  title: string;
  leftType?: NavLeftType;
  onLeftClick?: () => void;
  rightText?: string;
  onRightClick?: () => void;
}

const CustomNavBar: React.FC<CustomNavBarProps> = ({
  title,
  leftType = 'none',
  onLeftClick,
  rightText,
  onRightClick
}) => {
  const info = useMemo(() => {
    try {
      return Taro.getSystemInfoSync();
    } catch (e) {
      console.error('[CustomNavBar] getSystemInfoSync failed', e);
      return { statusBarHeight: 0 };
    }
  }, []);

  const statusBarHeight = info.statusBarHeight || 0;
  const barHeight = 44;
  const totalHeight = statusBarHeight + barHeight;

  return (
    <View className={styles.root}>
      <View className={styles.fixed} style={{ paddingTop: `${statusBarHeight}px` }}>
        <View className={styles.bar} style={{ height: `${barHeight}px` }}>
          <View
            className={classnames(styles.side, styles.left)}
            onClick={leftType === 'none' ? undefined : onLeftClick}
          >
            {leftType !== 'none' && (
              <Text className={styles.icon}>{leftType === 'close' ? '×' : '‹'}</Text>
            )}
          </View>
          <View className={styles.center}>
            <Text className={styles.title}>{title}</Text>
          </View>
          <View className={classnames(styles.side, styles.right)} onClick={rightText ? onRightClick : undefined}>
            {rightText && <Text className={styles.rightText}>{rightText}</Text>}
          </View>
        </View>
      </View>
      <View style={{ height: `${totalHeight}px` }} />
    </View>
  );
};

export default CustomNavBar;

