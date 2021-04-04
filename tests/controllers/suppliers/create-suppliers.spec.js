const faker = require('faker');

const CreateSupplierController = require('../../../src/controllers/suppliers/create-supplier');
const ServerError = require('../../../src/utils/errors/server');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const { badRequest, serverError, created } = require('../../../src/utils/http/http-helper');
const ValidationSpy = require('../mocks/mock-validation');
const SupplierRepositorySpy = require('../mocks/mock-supplier-repository');

const mockSupplier = () => ({
    name: 'valid_name',
    country: 'valid_country',
});

const mockRequest = () => {
    return {
        body: mockSupplier(),
    };
};

const mockArrayRequest = () => {
    return {
        body: [
            mockSupplier(),
            mockSupplier(),
        ]
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const supplierRepositorySpy = new SupplierRepositorySpy();
    const sut = new CreateSupplierController(supplierRepositorySpy, validationSpy);
    return {
        sut,
        validationSpy,
        supplierRepositorySpy,
    };
};

describe('CreateSupplier Controller', () => {
    it('should return 500 if SupplierRepository create() throws', async () => {
        const { sut, supplierRepositorySpy } = makeSut();
        jest.spyOn(supplierRepositorySpy, 'create').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should call SupplierRepository create() with correct values', async () => {
        const { sut, supplierRepositorySpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(supplierRepositorySpy.params).toEqual(sut.serializeSuppliersToDb(request.body));
    });

    it('should call Validation with correct value', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request.body);
    });

    it('should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 400 if Validation returns an error array', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 200 if valid array data is provided', async () => {
        const { sut } = makeSut();
        const request = mockArrayRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse).toEqual(created(request.body));
    });

    it('should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const request = mockRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse).toEqual(created(request.body));
    });
});
