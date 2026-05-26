# Triplist

`Triplist` 是一个基于 Taro + React + TypeScript 的高仿真小程序原型，聚焦外勤打卡、今日记录、历史外勤明细、员工出勤数据与日报创建流程。

## 项目说明

- 展示对象是小程序页面本体，不包含 Trae 预览平台外层面板
- 角色切换支持员工 / 主管
- 主管在 `记录` 页可看到 `员工出勤数据` 入口
- 员工名单点击谁，详情页就展示谁的出勤详情

## 主要页面

- `打卡`：首页、今日记录、日报入口、拍照区
- `记录`：今日记录、我的历史外勤明细、员工出勤数据（主管可见）
- `我的`：角色切换演示
- 二级页：员工名单、外勤详情、筛选日期区间、日报创建页

## 本地运行

```bash
npm install
npm run dev:h5
```

## 构建

```bash
npm run build:h5
```

## 技术栈

- Taro 4
- React 18
- TypeScript
- SCSS Modules
- Zustand
- dayjs

