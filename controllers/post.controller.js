const db = require('../helpers/db_connection');

exports.getAllPosts = async (req, res) => {
    if(!req.cookies.username){
        res.status(418).send({ message: 'You are not logged in!'})
    }
    const sqlQuery = `  SELECT * FROM posts AS p
                        JOIN users AS u ON u.id = p.user_id
                        ORDER BY p.date DESC`;
    let posts = (await db.promise().query(sqlQuery))[0]; 
    console.log(posts)
    if(posts?.length > 0){
        const sqlQuery1 = ` SELECT * FROM comments AS c
                            JOIN users AS u ON u.id = c.user_id
                            WHERE post_id = ?
                            ORDER BY c.date DESC`
        for(let post of posts){
            let comments = (await db.promise().query(sqlQuery1, [post.id]))[0];;
            post.comments = comments.length > 0? comments : [];
        }
        console.log(posts)
        res.status(200).send(posts)
    }else{
        res.status(418).send({ message: 'Somthing went wrong' })
    }
}

exports.addPost = (req, res) => {
    if(!req.cookies.username){
        res.status(418).send({ message: 'You are not logged in!'})
    }
    const content  = req.body.content? req.body.content : null;
    const date  = req.body.date? req.body.date : null;
    const user_id  = req.body.user_id? req.body.user_id : null;
    if(content && date && user_id){
        const sqlQuery = `INSERT INTO posts (content, date, user_id) VALUES (?,?,?)`
        db.query(sqlQuery, [content, date, user_id], (error,result) => {
            if(result.affectedRows == 1){
                res.status(200).send(result)
            }else{
                res.status(418).send({ message: 'Post was not added, try again'})
            }
        })
    }else{
        res.status(418).send({ message: 'Fields are missing!' })
    }
}

