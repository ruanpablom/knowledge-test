--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE purchase_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL, 
    price REAL,
    deletion_flag TEXT(1),
    CONSTRAINT purchaseOrderProduct_fk_productId FOREIGN KEY (product_id)
    REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO 
    purchase_orders (product_id, price) 
VALUES 
    (1, 0.90);
--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE purchase_orders;