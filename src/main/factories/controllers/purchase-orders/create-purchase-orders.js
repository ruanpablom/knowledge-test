const PurchaseOrdersRepository = require('../../../../repositories/purchase-orders');
const CreatePurchaseOrdersController = require('../../../../controllers/purchase-orders/create-purchase-orders');
const makeCreatePurchaseOrdersValidators = require('../../validators/purchase-orders/create-purchase-orders');

module.exports = () => {
    const repository = new PurchaseOrdersRepository();
    const validators = makeCreatePurchaseOrdersValidators();

    return new CreatePurchaseOrdersController(repository, validators);
};
