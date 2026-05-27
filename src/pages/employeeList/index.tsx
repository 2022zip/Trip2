import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNavBar from '@/components/CustomNavBar';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const EmployeeListPage: React.FC = () => {
  const navigate = useNavigate();
  const { employees } = useAppStore((s) => ({
    employees: s.employees
  }));

  const list = useMemo(() => employees, [employees]);

  return (
    <div className={styles.page}>
      <CustomNavBar title="员工名单" leftType="back" onLeftClick={() => navigate(-1)} rightText="返回" onRightClick={() => navigate(-1)} />
      <div className={styles.content}>
        <div className={styles.card}>
          {list.map((e) => (
            <button
              type="button"
              key={e.id}
              className={styles.row}
              onClick={() => navigate(`/outwork-detail/${e.id}`)}
            >
              <span className={styles.name}>{e.name}</span>
              <span className={styles.arrow}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeListPage;
