const { serverError, badRequest, deleted } = require('../../utils/http/http-helper');

module.exports = class DeletePurchaseOrderController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        const { id } = request.route;
        try {
            const errors = this.validation.validate({id: Number(id)});
            if (errors.length > 0) {
                return badRequest(errors);
            }

            const idExists = await this.repository.findById(id);

            if (idExists.length === 0) {
                return badRequest(new Error('Order doesn\'t exists on DB'));
            }

            const deletedOrder = await this.repository.delete(id);

            return deleted(deletedOrder);
        } catch (error) {
            console.log(error);
            return serverError(error);
        }
    }

    serializePurchaseOrdersToDb(purchaseOrders) {
        purchaseOrders = Array.isArray(purchaseOrders) ? purchaseOrders : [purchaseOrders];

        return purchaseOrders.map(purchaseOrder => ([
            purchaseOrder.product_id,
            purchaseOrder.price,
        ]));
    }
};
