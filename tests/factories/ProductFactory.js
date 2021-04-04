const faker = require('faker');

module.exports = ({supplier_id}) => {
    return {
        id: faker.datatype.number(50),
        description: faker.random.words(4),
        supplier_id: supplier_id || faker.datatype.number(50),
    };
};
