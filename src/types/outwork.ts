export type Role = 'employee' | 'manager';

export interface Employee {
  id: string;
  name: string;
  deptName: string;
}

export interface OutworkRecord {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: string;
  address: string;
}

export interface OutworkTrip {
  id: string;
  employeeId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  records: OutworkRecord[];
}

