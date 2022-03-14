
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const config = require('./db_config.json');

const { host, port, user, password, database } = config.database;
const connection =  mysql.createConnection({ host, user, password, database });



module.exports = connection;

// initialize();

// async function initialize() {
    
    // connect to db
    // const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    // db.User = require('../users/user.model')(sequelize);
    // sync all models with database
    // await sequelize.sync({ alter: true });
// }

// db.promise().query(`INSERT INTO USERS VALUES('2','JohnDoe')`);
// db.promise().query(`INSERT INTO USERS VALUES('3','Michael22')`);
// db.promise().query(`INSERT INTO USERS VALUES('4','Sendi')`);
// db.promise().query(`INSERT INTO USERS VALUES('5','Bar')`);
// db.promise().query(`INSERT INTO USERS VALUES('6','Netta')`);


 // const connection = await mysql.createConnection({
    //                         host: "localhost",
    //                         user: "root",
    //                         password: "March077",
    //                         database: "dinogram_db"
    //                     });