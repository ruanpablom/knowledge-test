const InvalidParamError = require('../utils/errors/invalid-param');

module.exports = class SchemaValidator {
    constructor(schema) {
        this.schema = schema;
    }

    paramSchemaValidation(inputKey, inputValue) {
        const { err, message } = this.schema[inputKey](inputValue);
        return {
            err,
            message
        };
    }

    validate(input) {
        return Object
            .keys(input)
            .filter(key => {
                return !this.schema[key] || this.paramSchemaValidation(key, input[key]).err;
            })
            .map(key => {
                console.log(key);
                const message = !this.schema[key] ? 'doesn\'t exists on schema validation' : this.paramSchemaValidation(key, input[key]).message;
                return new InvalidParamError(key, message);
            });
    }
};
