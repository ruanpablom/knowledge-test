const { adaptRoute } = require('../adapters/express-router-adapter');

module.exports = (router) => {
    router.get('/orders', adaptRoute());
    router.post('/orders', adaptRoute());
};
