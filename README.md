# Triplist

`Triplist` 是一个基于 React + TypeScript + Vite 的高仿真 H5 原型，聚焦外勤打卡、今日记录、历史外勤明细、员工出勤数据与日报创建流程。

## 项目说明

- 当前已迁成纯 React H5 项目，不再依赖 Taro 或小程序运行时
- 展示对象是页面本体，不包含 Trae 预览平台外层面板
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
npm run dev
```

## 构建

```bash
npm run build
```

## H5 部署说明

- 构建产物目录：`dist`
- 适合部署到 Vercel、Netlify、静态服务器或 GitHub Pages
- 浏览器页面标题已调整为 `Triplist H5`

## 技术栈

- Taro 4
- Vite 5
- React 18
- TypeScript
- SCSS Modules
- Zustand
- dayjs
