const makeDbInstance = require('../main/factories/db');

const db = makeDbInstance();

module.exports = class PurchaseOrdersRepository {
    async findAll() {
        const sql = `
          SELECT
            purchase_orders.id,
            price,
            json_object(
              'id',products.id,
              'description',products.description,
              'supplier',json_object(
                'id', suppliers.id,
                'name', suppliers.name,
                'country', suppliers.country
              )
            ) as product
          FROM
            purchase_orders
          JOIN products on products.id = purchase_orders.product_id
          JOIN suppliers WHERE suppliers.id = products.supplier_id
      `;
        const purchaseOrders = await db.select(sql);
        for (const purchaseOrder of purchaseOrders) {
            purchaseOrder.product = JSON.parse(purchaseOrder.product);
        }

        return purchaseOrders;
    }

    async create(purchaseOrders) {
        const sql = `INSERT INTO 
                        purchase_orders(product_id, price)
                      VALUES (?,?)`;
        return db.persistMany(sql, purchaseOrders);
    }
};
