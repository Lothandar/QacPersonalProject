const Sequelize = require('sequelize')


var sequelize = new Sequelize(
    '******', //database
    '******', //username
    '******' ,//password
    {
        host: 'localhost',
        dialect: 'mysql'
    });
sequelize
.authenticate()
.then(() => {
    console.log('connected');
})
.catch(err => {
    console.error('EVERYTHING IS ON FIRE', err);
});

const Item = sequelize.define('item', {
    item: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.NUMBER
    }
});

Item.sync({force: true});