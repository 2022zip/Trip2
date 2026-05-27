import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from '@/components/AppShell';
import HomePage from '@/pages/home';
import RecordsPage from '@/pages/records';
import MinePage from '@/pages/mine';
import TodayRecordsPage from '@/pages/todayRecords';
import EmployeeListPage from '@/pages/employeeList';
import OutworkDetailPage from '@/pages/outworkDetail';
import ReportCreatePage from '@/pages/reportCreate';
import './app.scss';

const App: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/mine" element={<MinePage />} />
        <Route path="/today-records" element={<TodayRecordsPage />} />
        <Route path="/employee-list" element={<EmployeeListPage />} />
        <Route path="/outwork-detail/:employeeId" element={<OutworkDetailPage />} />
        <Route path="/report-create" element={<ReportCreatePage />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default App;
