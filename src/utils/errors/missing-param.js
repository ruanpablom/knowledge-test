module.exports = class MissingParamError extends Error {
    constructor(paramName) {
        super();
        this.name = 'MissingParamError';
        this.message = `Missing param: ${paramName}`;
    }
};
