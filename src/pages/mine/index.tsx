import React, { useMemo } from 'react';
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
    <div className={styles.page}>
      <CustomNavBar title="我的" leftType="none" />
      <div className={styles.content}>
        <div className={styles.card}>
          <span className={styles.title}>角色切换（原型演示）</span>
          <span className={styles.desc}>
            员工/主管的主要差异：主管在“记录”页会多一个“员工出勤数据”入口（员工名单→明细）。
          </span>

          <div className={styles.seg}>
            <button
              type="button"
              className={classnames(styles.segBtn, role === 'employee' && styles.segActive)}
              onClick={() => setRole('employee')}
            >
              <span className={classnames(styles.segText, role === 'employee' && styles.segTextActive)}>员工</span>
            </button>
            <button
              type="button"
              className={classnames(styles.segBtn, role === 'manager' && styles.segActive)}
              onClick={() => setRole('manager')}
            >
              <span className={classnames(styles.segText, role === 'manager' && styles.segTextActive)}>主管</span>
            </button>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaLine}>当前用户：{user?.name || '—'}</span>
            <span className={styles.metaLine}>部门：{user?.deptName || '—'}</span>
            <span className={styles.metaLine}>当前角色：{role === 'manager' ? '主管' : '员工'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinePage;
