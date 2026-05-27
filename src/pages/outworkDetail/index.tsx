import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import CustomNavBar from '@/components/CustomNavBar';
import DateRangeModal from '@/components/DateRangeModal';
import {
  getAllRecordsByEmployeeId,
  getEmployeeById,
  getLatestTripByEmployeeId,
  useAppStore
} from '@/store/useAppStore';
import { groupRecordsByDate, isBetweenDates } from '@/utils/outwork';
import styles from './index.module.scss';

const OutworkDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { employees, trips, dynamicRecords } = useAppStore((s) => ({
    employees: s.employees,
    trips: s.trips,
    dynamicRecords: s.dynamicRecords
  }));

  const { employeeId = '' } = useParams();
  const employee = useMemo(() => getEmployeeById(employees, employeeId), [employeeId, employees]);
  const allRecords = useMemo(
    () => getAllRecordsByEmployeeId(trips, dynamicRecords, employeeId),
    [dynamicRecords, employeeId, trips]
  );

  const latestTrip = useMemo(() => getLatestTripByEmployeeId(trips, employeeId), [employeeId, trips]);

  const initialRange = useMemo(() => {
    if (latestTrip) return { startDate: latestTrip.startDate, endDate: latestTrip.endDate };
    if (allRecords.length > 0) {
      const dates = allRecords.map((r) => r.date).sort();
      return { startDate: dates[0], endDate: dates[dates.length - 1] };
    }
    const t = dayjs().format('YYYY-MM-DD');
    return { startDate: t, endDate: t };
  }, [allRecords, latestTrip]);

  const [range, setRange] = useState(initialRange);
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = useMemo(
    () => allRecords.filter((r) => isBetweenDates(r.date, range.startDate, range.endDate)),
    [allRecords, range.endDate, range.startDate]
  );
  const groups = useMemo(() => groupRecordsByDate(filtered), [filtered]);

  const rangeLabel = useMemo(() => {
    const s = dayjs(range.startDate).format('MM/DD');
    const e = dayjs(range.endDate).format('MM/DD');
    return `${s}–${e}`;
  }, [range.endDate, range.startDate]);

  return (
    <div className={styles.page}>
      <CustomNavBar title="外勤打卡" leftType="back" onLeftClick={() => navigate(-1)} rightText="返回" onRightClick={() => navigate(-1)} />
      <div className={styles.content}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryMain}>
            <span className={styles.summaryTitle}>{employee?.name || '—'} 出勤详情</span>
            <span className={styles.rangeText}>出差时间段：{rangeLabel}</span>
          </div>
          <button type="button" className={styles.filterBtn} onClick={() => setModalVisible(true)}>
            筛选
          </button>
        </div>

        {groups.length === 0 ? (
          <span className={styles.empty}>该区间暂无外勤记录</span>
        ) : (
          groups.map((g) => (
            <div key={g.date} className={styles.groupCard}>
              <div className={styles.groupHeader}>
                <span className={styles.groupDate}>{dayjs(g.date).format('MM/DD（ddd）')}</span>
              </div>
              {g.records.map((r, idx) => (
                <div key={r.id} className={styles.item}>
                  <span className={styles.itemLine1}>
                    {idx + 1}. {r.type}—{r.time}
                  </span>
                  <span className={styles.itemLine2}>地址：{r.address}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      <DateRangeModal
        visible={modalVisible}
        startDate={range.startDate}
        endDate={range.endDate}
        onCancel={() => setModalVisible(false)}
        onConfirm={(payload) => {
          setRange(payload);
          setModalVisible(false);
        }}
      />
    </div>
  );
};

export default OutworkDetailPage;
