const makeDbInstance = require('../main/factories/db');

const db = makeDbInstance();

module.exports = class PurchaseOrdersRepository {
    async findAll() {
        const sql = `
            SELECT
              purchase_orders.id,
              products.*, 
              price,
            FROM
              purchase_orders
            JOIN products ON products.product_id = purchase_orders.product.id
        `;
        const products = await db.select(sql);

        return products;
    }
};
