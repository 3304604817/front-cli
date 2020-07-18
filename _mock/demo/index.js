const mockjs = require('mockjs');

module.exports = {
  'GET /htodo/v1/:tid/tasks': (req, res) => {
    const size = req.params.size || 10;
    const page = req.params.page || 0;
    const d = mockjs.mock({
      'content|1-30': [
        {
          objectVersionNumber: 2,
          id: '@id',
          name: '@name',
          path: '@url',
          title: '@title',
          _token:
            'wmv950RaJ9bYO1ipM8sPg03+MsaTRH7Hw0QQLACki7Z8a6yEE5PgLsfHTgcPqv4YmAPGtD09/n9T6F05Qv8NhA==',
          employeeId: '@id',
          'state|1': ['CODE_1', 'CODE_2', 'CODE_3'],
          'taskNumber|+1': 1,
          taskDescription: '@csentence',
          percent: '0',
          tenantId: 111,
          employeeNumber: '@word',
          employeeName: '@cname',
        },
      ],
      size,
      number: page,
      numberOfElements: (thisObj) => thisObj.context.root.content.length,
      totalElements: 34,
    });
    res.json(d);
  },
  'GET /business-26357/v1/:tenantId/sbss-forecast-order-heads': (req, res) => {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, X-Requested-With,Access-Control-Allow-Headers'
    );
    const d = mockjs.mock({
      _token: 'keUs24wdEJx8Lgl9KbyHaW3Pyg8anglhvllGobP5iHXp9gG7BAVD+JyOIJftOPBm',
      id: 1,
      forecastNum: 'hand',
      purchaseCompanyName: '汉得',
      supplierNum: '001',
      supplierName: '采购一',
      forecastOrderStatus: '交易中',
    });
    res.json(d);
  },
};
