import React from 'react';
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
  return (
    <div className={styles.root}>
      <div className={styles.fixed}>
        <div className={styles.bar}>
          <button
            type="button"
            className={classnames(styles.side, styles.left)}
            onClick={leftType === 'none' ? undefined : onLeftClick}
            disabled={leftType === 'none'}
          >
            {leftType !== 'none' && (
              <span className={styles.icon}>{leftType === 'close' ? '×' : '‹'}</span>
            )}
          </button>
          <div className={styles.center}>
            <span className={styles.title}>{title}</span>
          </div>
          <button
            type="button"
            className={classnames(styles.side, styles.right)}
            onClick={rightText ? onRightClick : undefined}
            disabled={!rightText}
          >
            {rightText && <span className={styles.rightText}>{rightText}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomNavBar;
