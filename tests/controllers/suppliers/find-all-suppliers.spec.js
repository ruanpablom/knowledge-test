const FindAllSuppliersController = require('../../../src/controllers/suppliers/find-all-suppliers');
const ServerError = require('../../../src/utils/errors/server');
const { serverError, success } = require('../../../src/utils/http/http-helper');
const SupplierRepositorySpy = require('../mocks/mock-supplier-repository');

const makeSut = () => {
    const supplierRepositorySpy = new SupplierRepositorySpy();
    const sut = new FindAllSuppliersController(supplierRepositorySpy);
    return {
        sut,
        supplierRepositorySpy,
    };
};

describe('FindAllSupplier Controller', () => {
    it('should return 500 if SuppliersRepository findAll() throws', async () => {
        const { sut, supplierRepositorySpy } = makeSut();
        jest.spyOn(supplierRepositorySpy, 'findAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle();
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should return 200 if repository returns suppliers', async () => {
        const { sut, supplierRepositorySpy } = makeSut();
        supplierRepositorySpy.result = [];
        const httpResponse = await sut.handle();
        expect(httpResponse).toEqual(success({ suppliers: [] }));
    });
});
