import React, { useMemo, useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import classnames from 'classnames';
import styles from './index.module.scss';

const ReportCreatePage: React.FC = () => {
  const today = useMemo(() => dayjs().format('YYYY/MM/DD'), []);
  const [contactWay, setContactWay] = useState('拜访');
  const [progress, setProgress] = useState('重要客户');
  const [expand, setExpand] = useState(false);

  const contactWays = useMemo(
    () => ['拜访', '电话', '微信', '邮件', '传真', '研讨会', '活动回访', 'Callin Pass回复', 'Callout Pass回复'],
    []
  );

  const progressList = useMemo(
    () => ['重要客户', '苗头客户', '符合客户画像', '不限进', '未有效联系', '潜客开发', '建立关系', 'C2进入经营'],
    []
  );

  const visibleProgress = expand ? progressList : progressList.slice(0, 4);

  const goBack = () => {
    try {
      Taro.navigateBack();
    } catch (e) {
      console.error('[ReportCreate] navigateBack failed', e);
      Taro.switchTab({ url: '/pages/home/index' });
    }
  };

  return (
    <View className={styles.page}>
      <View className={styles.headerFixed}>
        <View className={styles.headerBar}>
          <View className={styles.headerLeft}>
            <Text className={styles.headerIcon} onClick={goBack}>
              ←
            </Text>
            <Text className={styles.headerIcon} onClick={goBack}>
              ×
            </Text>
          </View>
          <Text className={styles.headerTitle}>新增跟进记录</Text>
          <View className={styles.headerRight}>
            <Text className={styles.menuIcon} onClick={() => Taro.showToast({ title: '更多（原型）', icon: 'none' })}>
              ⋯
            </Text>
          </View>
        </View>
      </View>
      <View className={styles.headerPlaceholder} />

      <View className={styles.content}>
        <View className={styles.formCard}>
          <View className={styles.row} onClick={() => Taro.showToast({ title: '选择客户（原型）', icon: 'none' })}>
            <View className={styles.labelWrap}>
              <Text className={styles.required}>*</Text>
              <Text className={styles.label}>客户</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text className={styles.value}>选择客户</Text>
              <Text className={styles.arrow}>›</Text>
            </View>
          </View>

          <View className={styles.row}>
            <View className={styles.labelWrap}>
              <Text className={styles.required}>*</Text>
              <Text className={styles.label}>日期</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text className={classnames(styles.value, styles.valueActive)}>{today}</Text>
              <Text className={styles.arrow}>›</Text>
            </View>
          </View>

          <View
            className={styles.row}
            onClick={() => Taro.showToast({ title: '设置下次联络日（原型）', icon: 'none' })}
          >
            <View className={styles.labelWrap}>
              <Text className={styles.label}>下次联络日</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text className={styles.value}>日期(选择后将自动在企微创建日程)</Text>
              <Text className={styles.arrow}>›</Text>
            </View>
          </View>

          <View
            className={styles.row}
            onClick={() => Taro.showToast({ title: '选择最近联络人（原型）', icon: 'none' })}
          >
            <View className={styles.labelWrap}>
              <Text className={styles.required}>*</Text>
              <Text className={styles.label}>最近联络人</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text className={styles.value}>请先选择客户</Text>
              <Text className={styles.arrow}>›</Text>
            </View>
          </View>

          <View
            className={styles.row}
            onClick={() => Taro.showToast({ title: '填写工作内容（原型）', icon: 'none' })}
          >
            <View className={styles.labelWrap}>
              <Text className={styles.required}>*</Text>
              <Text className={styles.label}>工作内容(痛点/需求描述)</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text className={styles.value}>请先选择联络人</Text>
              <Text className={styles.arrow}>›</Text>
            </View>
          </View>
        </View>

        <View className={styles.section}>
          <View className={styles.sectionTitleRow}>
            <View className={styles.labelWrap}>
              <Text className={styles.required}>*</Text>
              <Text className={styles.sectionTitle}>客情方式</Text>
            </View>
          </View>
          <View className={styles.tags}>
            {contactWays.map((t) => {
              const active = t === contactWay;
              return (
                <View
                  key={t}
                  className={classnames(styles.tag, active && styles.tagActive)}
                  onClick={() => setContactWay(t)}
                >
                  <Text className={classnames(styles.tagText, active && styles.tagTextActive)}>{t}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className={styles.section}>
          <View className={styles.sectionTitleRow}>
            <View className={styles.labelWrap}>
              <Text className={styles.required}>*</Text>
              <Text className={styles.sectionTitle}>销售进度</Text>
            </View>
            <Text className={styles.expandText} onClick={() => setExpand((v) => !v)}>
              {expand ? '收起' : '展开'}
            </Text>
          </View>
          <View className={styles.tags}>
            {visibleProgress.map((t) => {
              const active = t === progress;
              return (
                <View
                  key={t}
                  className={classnames(styles.tag, active && styles.tagActive)}
                  onClick={() => setProgress(t)}
                >
                  <Text className={classnames(styles.tagText, active && styles.tagTextActive)}>{t}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Button
          className={styles.createBtn}
          onClick={() => {
            Taro.showToast({ title: '创建成功（原型）', icon: 'success' });
            setTimeout(() => {
              Taro.switchTab({ url: '/pages/home/index' });
            }, 600);
          }}
        >
          <Text className={styles.createText}>创建</Text>
        </Button>
      </View>
    </View>
  );
};

export default ReportCreatePage;

