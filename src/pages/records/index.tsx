import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNavBar from '@/components/CustomNavBar';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const RecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUserId, role } = useAppStore((s) => ({ currentUserId: s.currentUserId, role: s.role }));

  return (
    <div className={styles.page}>
      <CustomNavBar title="记录" leftType="none" />
      <div className={styles.content}>
        <div className={styles.card}>
          <button type="button" className={styles.item} onClick={() => navigate('/today-records')}>
            <div className={styles.left}>
              <span className={styles.title}>今日记录</span>
              <span className={styles.desc}>仅显示今天，不支持查看前天等历史日期</span>
            </div>
            <span className={styles.arrow}>›</span>
          </button>
          <button
            type="button"
            className={styles.item}
            onClick={() => navigate(`/outwork-detail/${currentUserId}`)}
          >
            <div className={styles.left}>
              <span className={styles.title}>我的历史外勤明细</span>
              <span className={styles.desc}>默认最近一段出差单，可筛选日期区间</span>
            </div>
            <span className={styles.arrow}>›</span>
          </button>
          {role === 'manager' && (
            <button type="button" className={styles.item} onClick={() => navigate('/employee-list')}>
              <div className={styles.left}>
                <span className={styles.title}>员工出勤数据</span>
                <span className={styles.desc}>查看员工名单，进入对应人员出勤详情</span>
              </div>
              <span className={styles.arrow}>›</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordsPage;
