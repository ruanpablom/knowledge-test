const RequiredFieldValidator = require('../../../../validators/required-field');
const SchemaValidator = require('../../../../validators/schema');
const ValidationComposite = require('../../../../validators/validation-composite');

const getMandatoryFields = () => [
    'description',
    'supplier_id',
];

const getSchema = () => ({
    description: value => {
        const stringSize = 100;
        const constraints = [typeof value !== 'string', value.length > stringSize];
        return {
            err: constraints.reduce((accumulator, currentValue) => accumulator || currentValue ),
            message: `${constraints[0] ? 'expect a string' : ''} ${constraints[1] ? `length must be <= ${stringSize}` : ''}`
        };
    },
    supplier_id: value => {
        return {
            err: typeof value !== 'number',
            message: 'expect number'
        };
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
