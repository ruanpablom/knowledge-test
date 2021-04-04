const PurchaseOrdersRepository = require('../../src/repositories/purchase-orders');
const PurchaseOrderFactory = require('../factories/PurchaseOrderFactory');
const SupplierFactory = require('../factories/SupplierFactory');
const ProductFactory = require('../factories/ProductFactory');

// jest.mock('../../src/main/factories/db', () => {
//     return () => ({
//         persistMany: () => 2,
//         select: () => []
//     });
// });

describe('PurchaseOrder', () => {
    const makeSut = () => {
        const sut = new PurchaseOrdersRepository();
        return {
            sut,
        };
    };

    const suppliers = [
        SupplierFactory(),
        SupplierFactory(),
    ];

    const products = [
        ProductFactory({supplier_id: suppliers[0].id}),
        ProductFactory({supplier_id: suppliers[1].id}),
    ];

    const purchaseOrders = [
        PurchaseOrderFactory({product_id: products[0].id}),
        PurchaseOrderFactory({product_id: products[1].id}),
    ];

    describe('create()', () => {
        it('should be able create PurchaseOrders and return length', async () => {
            const { sut } = makeSut();
            jest.spyOn(sut.db, 'persistMany').mockImplementation(() => purchaseOrders.length);
            const createdOrder = await sut.create();
            expect(createdOrder).toBe(2);
        });
    });

    describe('findAll()', () => {
        it('should be able list all PurchaseOrders', async () => {
            const { sut } = makeSut();
            const result = purchaseOrders.map(purchaseOrder => {
                const product = products.find(product => product.id === purchaseOrder.product_id);
                const supplier = suppliers.find(supplier => supplier.id === product.supplier_id);
                return {
                    id: purchaseOrder.id,
                    price: purchaseOrder.price,
                    deletion_flag: purchaseOrder.deletion_flag,
                    product: JSON.stringify({
                        id: product.id,
                        description: product.description,
                        supplier: {
                            id: supplier.id,
                            name: supplier.name,
                            country: supplier.country
                        }
                    })
                };
            });
            jest.spyOn(sut.db, 'select').mockImplementation(() => {
                return result;
            });

            const allPurchaseOrders = await sut.findAll();
            expect(allPurchaseOrders).toBe(result);
        });
    });

    describe('findById()', () => {
        it('should be able to find a purchase order by id', async () => {
            const { sut } = makeSut();
            const purchaseOrderToFind = purchaseOrders[0];
            const result = purchaseOrders.find(purchaseOrder => purchaseOrder.id === purchaseOrderToFind.id);

            jest.spyOn(sut.db, 'select').mockImplementation(() => {
                return result;
            });

            const allPurchaseOrders = await sut.findById();
            expect(allPurchaseOrders).toBe(result);
        });
    });

    describe('delete()', () => {
        it('should be able to delete a purchase order', async () => {
            const { sut } = makeSut();
            const purchaseOrderToDelete = purchaseOrders[0];

            jest.spyOn(sut.db, 'delete').mockImplementation(() => {
                return purchaseOrderToDelete.deletion_flag = '1';
            });

            await sut.delete(purchaseOrderToDelete.id);
            expect(purchaseOrderToDelete.deletion_flag).toBe('1');
        });
    });
});
