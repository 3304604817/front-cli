const mockjs = require('mockjs');

module.exports = {
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
