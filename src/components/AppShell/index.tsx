import React from 'react';
import classNames from 'classnames';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Toast from '@/components/Toast';
import styles from './index.module.scss';

const tabs = [
  { path: '/home', label: '打卡' },
  { path: '/records', label: '记录' },
  { path: '/mine', label: '我的' }
];

const AppShell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showTabBar = tabs.some((tab) => tab.path === location.pathname);

  return (
    <div className={styles.viewport}>
      <div className={styles.device}>
        <div className={styles.screen}>
          <div className={styles.notch} />
          <div className={classNames(styles.content, showTabBar && styles.contentWithTab)}>
            <Outlet />
          </div>
          {showTabBar && (
            <div className={styles.tabBar}>
              {tabs.map((tab) => (
                <button
                  key={tab.path}
                  type="button"
                  className={classNames(styles.tab, location.pathname === tab.path && styles.tabActive)}
                  onClick={() => navigate(tab.path)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
          <Toast />
        </div>
      </div>
    </div>
  );
};

export default AppShell;
