import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import CustomNavBar from '@/components/CustomNavBar';
import { getEmployeeById, useAppStore } from '@/store/useAppStore';
import { showToast } from '@/utils/toast';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
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
    <div className={styles.page}>
      <CustomNavBar title="外勤打卡" leftType="close" onLeftClick={() => showToast('原型演示')} />
      <div className={styles.content}>
        <div className={styles.userRow}>
          <div className={styles.userTopRow}>
            <span className={styles.roleText}>{roleLabel}</span>
          </div>
          <span className={styles.userName}>
            {user?.name || '—'}，{greeting}
          </span>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.actionBtn} onClick={() => navigate('/today-records')}>
            <span className={styles.actionText}>查看今日记录</span>
          </button>
          <button
            type="button"
            className={classnames(styles.actionBtn, styles.actionPrimary)}
            onClick={() => navigate('/report-create')}
          >
            <span className={classnames(styles.actionText, styles.actionTextPrimary)}>写日报</span>
          </button>
        </div>

        <div className={styles.clockWrap}>
          <button
            type="button"
            className={styles.clockCircle}
            onClick={() => {
              addCheckIn({ employeeId: currentUserId });
              showToast('打卡成功（原型）', 'success');
            }}
          >
            <span className={styles.clockTitle}>外勤打卡</span>
            <span className={styles.clockTime}>{timeText}</span>
          </button>
        </div>

        <button type="button" className={styles.photoArea} onClick={() => showToast('拍照区（原型）')}>
          <span className={styles.photoText}>拍照区</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
