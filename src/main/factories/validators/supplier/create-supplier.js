const RequiredFieldValidator = require('../../../../validators/required-field');
const SchemaValidator = require('../../../../validators/schema');
const ValidationComposite = require('../../../../validators/validation-composite');

const getMandatoryFields = () => [
    'name',
    'country',
];

const getSchema = () => ({
    name: value => {
        const stringSize = 50;
        const constraints = [typeof value !== 'string', value.length > stringSize];
        return {
            err: constraints.reduce((accumulator, currentValue) => accumulator || currentValue ),
            message: `${constraints[0] ? 'expect a string' : ''} ${constraints[1] ? `length must be <= ${stringSize}` : ''}`
        };
    },
    country: value => {
        const stringSize = 50;
        const constraints = [typeof value !== 'string', value.length > stringSize];
        return {
            err: constraints.reduce((accumulator = false, currentValue) => accumulator || currentValue ),
            message: `${constraints[0] ? 'expect a string' : ''} ${constraints[1] ? `length must be <= ${stringSize}` : ''}`
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
