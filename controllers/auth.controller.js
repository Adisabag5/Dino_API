const db = require('../helpers/db_connection');

exports.login = (req, res) => {
    
    const username  = req.body.username? req.body.username : null;
    if(username){
        const sqlQuery = `SELECT * FROM users WHERE username = '${username}'`
        db.query(sqlQuery, (error,result) => {
            console.log(result)
            if(result[0]?.username){
                res.cookie("username", username);
                res.status(200).send(result)
            }else{
                res.status(418).send({ message: 'User is not exist!' })
            }
        })
    }else{
        res.status(418).send({ message: 'Username was not provided!' })
    }
}

exports.register = async (req, res) => {

    console.log(req.body)
    const username  = req.body.username? req.body.username : null;
    if(username){
        const sqlQuery = `INSERT INTO users (username) VALUES (?)`
        db.query(sqlQuery, [username], (error,result) => {
            if(result.insertId){
                console.log(result)
                res.status(200).send([{id: result.insertId, username: username}])
            }else{
                res.status(418).send({ message: 'User was not added, try again'})
            }
        })
    }else{
        res.status(418).send({ message: 'Username was not provided!' })
    }
}

exports.getUser = (username) => {
   
}