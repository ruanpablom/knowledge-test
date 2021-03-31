const RequiredFieldValidator = require('../../../../validators/required-field');
const SchemaValidator = require('../../../../validators/schema');
const ValidationComposite = require('../../../../validators/validation-composite');

const getMandatoryFields = () => [
    'product_id',
    'price',
];

const getSchema = () => ({
    product_id: value => {
        return { err: typeof value !== 'number', message: 'expect number' };
    },
    price: value => {
        return { err: typeof value !== 'number', message: 'expect number' };
    },
});

module.exports = () => {
    const validations = [];
    const fields = getMandatoryFields();
    const schema = getSchema();

    validations.push(new RequiredFieldValidator(fields));
    validations.push(new SchemaValidator(schema));

    return new ValidationComposite(validations);
};
