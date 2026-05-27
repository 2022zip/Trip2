import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/utils/toast';
import styles from './index.module.scss';

const ReportCreatePage: React.FC = () => {
  const navigate = useNavigate();
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
    if (window.history.length > 1) navigate(-1);
    else navigate('/home');
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerFixed}>
        <div className={styles.headerBar}>
          <div className={styles.headerLeft}>
            <button type="button" className={styles.headerIcon} onClick={goBack}>
              ←
            </button>
            <button type="button" className={styles.headerIcon} onClick={goBack}>
              ×
            </button>
          </div>
          <span className={styles.headerTitle}>新增跟进记录</span>
          <div className={styles.headerRight}>
            <button type="button" className={styles.menuIcon} onClick={() => showToast('更多（原型）')}>
              ⋯
            </button>
          </div>
        </div>
      </div>
      <div className={styles.headerPlaceholder} />

      <div className={styles.content}>
        <div className={styles.formCard}>
          <button type="button" className={styles.row} onClick={() => showToast('选择客户（原型）')}>
            <div className={styles.labelWrap}>
              <span className={styles.required}>*</span>
              <span className={styles.label}>客户</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={styles.value}>选择客户</span>
              <span className={styles.arrow}>›</span>
            </div>
          </button>

          <div className={styles.row}>
            <div className={styles.labelWrap}>
              <span className={styles.required}>*</span>
              <span className={styles.label}>日期</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={classnames(styles.value, styles.valueActive)}>{today}</span>
              <span className={styles.arrow}>›</span>
            </div>
          </div>

          <button
            type="button"
            className={styles.row}
            onClick={() => showToast('设置下次联络日（原型）')}
          >
            <div className={styles.labelWrap}>
              <span className={styles.label}>下次联络日</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={styles.value}>日期(选择后将自动在企微创建日程)</span>
              <span className={styles.arrow}>›</span>
            </div>
          </button>

          <button
            type="button"
            className={styles.row}
            onClick={() => showToast('选择最近联络人（原型）')}
          >
            <div className={styles.labelWrap}>
              <span className={styles.required}>*</span>
              <span className={styles.label}>最近联络人</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={styles.value}>请先选择客户</span>
              <span className={styles.arrow}>›</span>
            </div>
          </button>

          <button
            type="button"
            className={styles.row}
            onClick={() => showToast('填写工作内容（原型）')}
          >
            <div className={styles.labelWrap}>
              <span className={styles.required}>*</span>
              <span className={styles.label}>工作内容(痛点/需求描述)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={styles.value}>请先选择联络人</span>
              <span className={styles.arrow}>›</span>
            </div>
          </button>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitleRow}>
            <div className={styles.labelWrap}>
              <span className={styles.required}>*</span>
              <span className={styles.sectionTitle}>客情方式</span>
            </div>
          </div>
          <div className={styles.tags}>
            {contactWays.map((t) => {
              const active = t === contactWay;
              return (
                <button
                  type="button"
                  key={t}
                  className={classnames(styles.tag, active && styles.tagActive)}
                  onClick={() => setContactWay(t)}
                >
                  <span className={classnames(styles.tagText, active && styles.tagTextActive)}>{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitleRow}>
            <div className={styles.labelWrap}>
              <span className={styles.required}>*</span>
              <span className={styles.sectionTitle}>销售进度</span>
            </div>
            <button type="button" className={styles.expandText} onClick={() => setExpand((v) => !v)}>
              {expand ? '收起' : '展开'}
            </button>
          </div>
          <div className={styles.tags}>
            {visibleProgress.map((t) => {
              const active = t === progress;
              return (
                <button
                  type="button"
                  key={t}
                  className={classnames(styles.tag, active && styles.tagActive)}
                  onClick={() => setProgress(t)}
                >
                  <span className={classnames(styles.tagText, active && styles.tagTextActive)}>{t}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <button
          type="button"
          className={styles.createBtn}
          onClick={() => {
            showToast('创建成功（原型）', 'success');
            setTimeout(() => {
              navigate('/home');
            }, 600);
          }}
        >
          <span className={styles.createText}>创建</span>
        </button>
      </div>
    </div>
  );
};

export default ReportCreatePage;
