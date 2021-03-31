const { serverError, success } = require('../../utils/http/http-helper');

module.exports = class FindAllProductsController {
    constructor(repository) {
        this.repository = repository;
    }

    async handle() {
        try {
            const products = await this.repository.findAll();
            return success({ products });
        } catch (error) {
            return serverError(error);
        }
    }
};
