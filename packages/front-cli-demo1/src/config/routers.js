module.exports = [
  {
    path: "/test-modules1/hello",
    component: () => import("../pages/hellojs/HelloWorldPage"),
    authorized: true,
    title: 'Hello',
  },
  /**
   * 预测单
   */
  {
    path: '/smart-business/forecast-order',
    models: [() => import('../models/forecastOrder')],
    authorized: true,
    title: '预测单',
    components: [
      // 预测单list
      {
        path: '/smart-business/forecast-order/list',
        models: [() => import('../models/forecastOrder')],
        component: () => import('../pages/ForecastOrder/index'),
      },
      // 预测单创建
      {
        path: '/smart-business/forecast-order/create',
        models: [() => import('../models/forecastOrder')],
        component: () => import('../pages/ForecastOrder/Detail/index'),
      },
      // 预测单详情
      {
        path: '/smart-business/forecast-order/detail/:id',
        models: [() => import('../models/forecastOrder')],
        component: () => import('../pages/ForecastOrder/Detail/index'),
      },
    ],
  },
  {
    path: '/demo/head-line',
    component: () => import('../pages/Demo/head-line'),
    authorized: true,
    title: 'head-line',
  },
];