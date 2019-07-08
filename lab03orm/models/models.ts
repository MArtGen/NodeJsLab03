const Sequelize = require('sequelize');

var sequelize = new Sequelize('nodejs', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const Shop = sequelize.define('shop', {
        id_buyer: {
            type: Sequelize.INTEGER(32),
            allowNull: false,
            primaryKey: true,
            autoIncrement: false
        },
        id_order: {
            type: Sequelize.INTEGER(32),
            allowNull: false,
            primaryKey: true,
            autoIncrement: false
        }
    }, {
            timestamps: false,
            tableName: 'shop',
        });

const Orders = sequelize.define('orders', {
        id_order: {
            type: Sequelize.INTEGER(32),
            allowNull: false,
            primaryKey: true,
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false,
            primaryKey: false,
            autoIncrement: false
        },
        order_cost: {
            type: Sequelize.INTEGER(32),
            allowNull: false,
            primaryKey: false,
            autoIncrement: false
        }
    }, {
            timestamps: false,
            tableName: 'orders'
        });

module.exports = { Shop: Shop, Orders: Orders };