import dayjs from 'dayjs';
import type { Employee, OutworkRecord, OutworkTrip } from '@/types/outwork';

const today = dayjs();
const baseStart = today.subtract(2, 'day').format('YYYY-MM-DD');
const baseEnd = today.add(2, 'day').format('YYYY-MM-DD');

export const employeesMock: Employee[] = [
  { id: 'e1', name: '李春', deptName: '业务部' },
  { id: 'e2', name: '柴青', deptName: '业务部' },
  { id: 'e3', name: '张佑铭', deptName: '业务部' },
  { id: 'e4', name: '徐博文', deptName: '业务部' },
  { id: 'e5', name: '余镇宇', deptName: '业务部' },
  { id: 'e6', name: '王勇', deptName: '业务部' },
  { id: 'e7', name: '夏友龙', deptName: '业务部' },
  { id: 'e8', name: '黄德欣', deptName: '业务部' }
];

const makeRecord = (params: Omit<OutworkRecord, 'id'>): OutworkRecord => ({
  ...params,
  id: `${params.employeeId}-${params.date}-${params.time}-${params.type}`
});

const makeTrip = (employeeId: string, seedOffset: number): OutworkTrip => {
  const startDate = dayjs(baseStart).add(seedOffset, 'day').format('YYYY-MM-DD');
  const endDate = dayjs(baseEnd).add(seedOffset, 'day').format('YYYY-MM-DD');
  const d0 = startDate;
  const d1 = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD');
  const d2 = dayjs(startDate).add(2, 'day').format('YYYY-MM-DD');
  const d3 = dayjs(startDate).add(3, 'day').format('YYYY-MM-DD');
  const d4 = endDate;
  const todayDate = today.format('YYYY-MM-DD');

  const records: OutworkRecord[] = [
    ...(employeeId === 'e3'
      ? [
          makeRecord({
            employeeId,
            date: todayDate,
            time: '08:40',
            type: '企业滴滴出行',
            address: '苏州市姑苏区客户园区（示例地址）'
          }),
          makeRecord({
            employeeId,
            date: todayDate,
            time: '09:25',
            type: '手动打卡（客户现场）',
            address: '苏州市姑苏区客户园区（示例地址）'
          })
        ]
      : []),
    makeRecord({
      employeeId,
      date: d0,
      time: '08:30',
      type: '私车公用出行',
      address: '上海市浦东新区张江高科（示例地址）'
    }),
    makeRecord({
      employeeId,
      date: d0,
      time: '09:45',
      type: '高铁出行',
      address: '上海虹桥站（示例地址）'
    }),
    makeRecord({
      employeeId,
      date: d1,
      time: '09:50',
      type: '高铁出行',
      address: '苏州站（示例地址）'
    }),
    makeRecord({
      employeeId,
      date: d1,
      time: '23:34',
      type: '手动打卡（酒店入住）',
      address: '苏州工业园区某酒店（示例地址）'
    }),
    makeRecord({
      employeeId,
      date: d2,
      time: '09:30',
      type: '手动打卡（客户现场）',
      address: '苏州市姑苏区客户园区（示例地址）'
    }),
    makeRecord({
      employeeId,
      date: d3,
      time: '08:40',
      type: '企业滴滴商务出行',
      address: '苏州金鸡湖（示例地址）'
    }),
    makeRecord({
      employeeId,
      date: d4,
      time: '09:18',
      type: '手动打卡（公交）',
      address: '上海市浦东新区世纪大道（示例地址）'
    })
  ];

  return {
    id: `t-${employeeId}-${startDate}`,
    employeeId,
    startDate,
    endDate,
    records
  };
};

export const tripsMock: OutworkTrip[] = employeesMock.map((e, idx) => makeTrip(e.id, idx % 2));
