const faker = require('faker');

module.exports = ({product_id}) => {
    return {
        id: faker.datatype.number(50),
        price: faker.datatype.number(1),
        product_id: product_id || faker.datatype.number(50),
        deletion_flag: '0'
    };
};
