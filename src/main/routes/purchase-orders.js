const { adaptRoute } = require('../adapters/express-router-adapter');
const makeFindAllPurchaseOrdersController = require('../factories/controllers/purchase-orders/find-all-purchase-orders');
const makeCreatePurchaseOrdersController = require('../factories/controllers/purchase-orders/create-purchase-orders');

module.exports = (router) => {
    router.get('/orders', adaptRoute(makeFindAllPurchaseOrdersController()));
    router.post('/orders', adaptRoute(makeCreatePurchaseOrdersController()));
};
