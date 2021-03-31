module.exports = class InvalidParamError extends Error {
    constructor(paramName, message) {
        super();
        this.name = 'InvalidParamError';
        this.message = `Invalid param: ${paramName} ${message}`;
    }
};
