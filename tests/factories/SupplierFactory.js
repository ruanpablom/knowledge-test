const faker = require('faker');

module.exports = () => {
    return {
        id: faker.datatype.number(50),
        name: faker.random.word(),
        country: faker.address.country(),
    };
};
