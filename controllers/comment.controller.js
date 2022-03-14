const db = require('../helpers/db_connection');

exports.getAllComments = (req, res) => {

    if(!req.cookies.username){
        res.status(418).send({ message: 'You are not logged in!'})
    }
   
    const post_id = req.body.post_id? req.body.post_id : 0;
    const sqlQuery = `SELECT * FROM comments WHERE post_id = ?`
    db.query(sqlQuery, [post_id], (error,result) => {
        if(result?.length > 0){
            res.status(200).send(result)
        }else{
            res.status(418).send({ message: 'Somthing went wrong'})
        }
    })
}

exports.addComment = (req, res) => {
    if(!req.cookies.username){
        res.status(418).send({ message: 'You are not logged in!'})
    }
    const content  = req.body.content? req.body.content : null;
    const date  = req.body.date? req.body.date : null;
    const post_id  = req.body.post_id? req.body.post_id : null;
    const user_id  = req.body.user_id? req.body.user_id : null;
    if(content && date && user_id && post_id){
        const sqlQuery = `INSERT INTO comments (content, date, post_id, user_id) VALUES (?,?,?,?)`
        db.query(sqlQuery, [content, date, post_id, user_id], (error,result) => {
            if(result.affectedRows == 1){
                res.status(200).send(result)
            }else{
                res.status(418).send({ message: 'Comment was not added, try again'})
            }
        })
    }else{
        res.status(418).send({ message: 'Fields are missing!' })
    }
}