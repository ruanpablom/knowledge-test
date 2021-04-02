const makeDbInstance = require('../main/factories/db');

const db = makeDbInstance();

module.exports = class PurchaseOrdersRepository {
    async findAll() {
        const sql = `
          SELECT
            purchase_orders.id,
            price,
            deletion_flag,
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
          JOIN products 
            ON products.id = purchase_orders.product_id
          JOIN suppliers 
            ON suppliers.id = products.supplier_id
          WHERE purchase_orders.deletion_flag <> "1"
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

    async findById(id) {
        const sql = `SELECT 
                      id 
                    FROM
                        purchase_orders
                    WHERE id = ${id} and deletion_flag <> "1"`;
        return db.select(sql);
    }

    async delete(purchaseOrderId) {
        const sql = `UPDATE purchase_orders
                      SET 
                        deletion_flag = "1"
                      WHERE
                          id = ${purchaseOrderId}`;
        return db.delete(sql);
    }
};
