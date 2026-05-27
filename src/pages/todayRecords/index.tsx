import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import CustomNavBar from '@/components/CustomNavBar';
import { getAllRecordsByEmployeeId, useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const TodayRecordsPage: React.FC = () => {
  const navigate = useNavigate();
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
    <div className={styles.page}>
      <CustomNavBar title="今日记录" leftType="back" onLeftClick={() => navigate(-1)} rightText="返回" onRightClick={() => navigate(-1)} />
      <div className={styles.content}>
        <span className={styles.tip}>仅显示今日数据，不支持查看前天等历史日期</span>
        {list.length === 0 ? (
          <span className={styles.empty}>今日暂无外勤记录</span>
        ) : (
          <div className={styles.card}>
            {list.map((r, idx) => (
              <div key={r.id} className={styles.item}>
                <span className={styles.line1}>
                  {idx + 1}. {r.type}—{r.time}
                </span>
                <span className={styles.line2}>地址：{r.address}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayRecordsPage;
