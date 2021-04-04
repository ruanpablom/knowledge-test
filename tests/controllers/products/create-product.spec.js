const faker = require('faker');

const CreateProductController = require('../../../src/controllers/products/create-product');
const ServerError = require('../../../src/utils/errors/server');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const { badRequest, serverError, created } = require('../../../src/utils/http/http-helper');
const ValidationSpy = require('../mocks/mock-validation');
const ProductRepositorySpy = require('../mocks/mock-product-repository');

const mockProduct = () => ({
    description: 'valid_description',
    supplier_id: 'valid_supplier_id',
});

const mockRequest = () => {
    return {
        body: mockProduct(),
    };
};

const mockArrayRequest = () => {
    return {
        body: [
            mockProduct(),
            mockProduct(),
        ]
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const productRepositorySpy = new ProductRepositorySpy();
    const sut = new CreateProductController(productRepositorySpy, validationSpy);
    return {
        sut,
        validationSpy,
        productRepositorySpy,
    };
};

describe('CreateProduct Controller', () => {
    it('should return 500 if ProductRepository create() throws', async () => {
        const { sut, productRepositorySpy } = makeSut();
        jest.spyOn(productRepositorySpy, 'create').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should call ProductRepository create() with correct values', async () => {
        const { sut, productRepositorySpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(productRepositorySpy.params).toEqual(sut.serializeProductsToDb(request.body));
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

    it('should return 200 if valid array data is provided', async () => {
        const { sut } = makeSut();
        const request = mockArrayRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse).toEqual(created(request.body));
    });
});
