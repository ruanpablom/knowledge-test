const PurchaseOrdersRepository = require('../../../../repositories/purchase-orders');
const DeletePurchaseOrderController = require('../../../../controllers/purchase-orders/delete-purchase-order');
const makeDeletePurchaseOrderValidators = require('../../validators/purchase-orders/delete-purchase-order');

module.exports = () => {
    const repository = new PurchaseOrdersRepository();
    const validators = makeDeletePurchaseOrderValidators();

    return new DeletePurchaseOrderController(repository, validators);
};
