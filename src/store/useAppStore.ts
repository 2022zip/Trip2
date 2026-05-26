import dayjs from 'dayjs';
import { create } from 'zustand';
import type { Employee, OutworkRecord, OutworkTrip, Role } from '@/types/outwork';
import { employeesMock, tripsMock } from '@/data/outworkMock';

interface AppState {
  role: Role;
  currentUserId: string;
  employees: Employee[];
  trips: OutworkTrip[];
  dynamicRecords: OutworkRecord[];
  setRole: (role: Role) => void;
  addCheckIn: (payload: { employeeId: string; type?: string; address?: string }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  role: 'employee',
  currentUserId: 'e3',
  employees: employeesMock,
  trips: tripsMock,
  dynamicRecords: [],
  setRole: (role) => set({ role }),
  addCheckIn: ({ employeeId, type, address }) =>
    set((state) => {
      const now = dayjs();
      const record: OutworkRecord = {
        id: `${employeeId}-${now.valueOf()}`,
        employeeId,
        date: now.format('YYYY-MM-DD'),
        time: now.format('HH:mm'),
        type: type || '手动打卡',
        address: address || '上海市浦东新区（示例地址）'
      };
      return { dynamicRecords: [record, ...state.dynamicRecords] };
    })
}));

export const getEmployeeById = (employees: Employee[], employeeId: string) =>
  employees.find((e) => e.id === employeeId);

export const getTripsByEmployeeId = (trips: OutworkTrip[], employeeId: string) =>
  trips.filter((t) => t.employeeId === employeeId);

export const getLatestTripByEmployeeId = (trips: OutworkTrip[], employeeId: string) => {
  const list = getTripsByEmployeeId(trips, employeeId);
  if (list.length === 0) return undefined;
  return [...list].sort((a, b) => (dayjs(a.endDate).isAfter(b.endDate) ? -1 : 1))[0];
};

export const getAllRecordsByEmployeeId = (trips: OutworkTrip[], dynamic: OutworkRecord[], employeeId: string) => {
  const base = getTripsByEmployeeId(trips, employeeId).reduce<OutworkRecord[]>(
    (acc, t) => acc.concat(t.records),
    []
  );
  const extra = dynamic.filter((r) => r.employeeId === employeeId);
  return [...extra, ...base].sort((a, b) => (dayjs(`${a.date} ${a.time}`).isAfter(`${b.date} ${b.time}`) ? -1 : 1));
};
