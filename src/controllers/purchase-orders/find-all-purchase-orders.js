const { serverError, success } = require('../../utils/http/http-helper');

module.exports = class FindAllPurchaseOrdersController {
    constructor(repository) {
        this.repository = repository;
    }

    async handle() {
        try {
            const purchaseOrders = await this.repository.findAll();
            return success({ purchaseOrders });
        } catch (error) {
            console.log(error);
            return serverError(error);
        }
    }
};
