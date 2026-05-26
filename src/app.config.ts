export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/records/index',
    'pages/mine/index',
    'pages/reportCreate/index',
    'pages/employeeList/index',
    'pages/outworkDetail/index',
    'pages/todayRecords/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '外勤打卡',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#4E5969',
    selectedColor: '#165DFF',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '打卡'
      },
      {
        pagePath: 'pages/records/index',
        text: '记录'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
