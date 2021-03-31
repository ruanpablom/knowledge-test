const PurchaseOrdersRepository = require('../../../../repositories/purchase-orders');
const FindAllPurchaseOrdersController = require('../../../../controllers/purchase-orders/find-all-purchase-orders');

module.exports = () => {
    const repository = new PurchaseOrdersRepository();

    return new FindAllPurchaseOrdersController(repository);
};
