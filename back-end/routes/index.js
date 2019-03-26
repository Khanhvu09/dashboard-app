var express = require('express');
var router = express.Router();
const db = require('../database')
const bcrypt = require('bcrypt-nodejs');


router.post('/signup', (req,res)=>{
  // console.log(req.body)
  const name = req.body.name
  const email = req.body.email
  const checkemailquery = `SELECT * FROM users WHERE email = $1`;
  db.query(checkemailquery,[req.body.email]).then((results)=>{
    if (results.length === 0){
      const insertUserQuery = `INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`;
      const hashPassword = bcrypt.hashSync(req.body.password);
      db.query(insertUserQuery,[name, email, hashPassword]).then(()=>{
        res.json({msg: 'userAdded'});
      })
    } else {
      res.json({msg: 'userExists'})
    }
  }).catch((error)=>{
    if(error){throw error}
  })
})

router.post('/login', (req,res)=>{
  const email = req.body.email
  const password = req.body.password
  const selectQuery = `SELECT * FROM users WHERE email = $1`;
  db.query(selectQuery,[email]).then((results)=>{
    if (results.length === 0){
      res.json({msg: 'baduser'})
    } else {
      const checkHash = bcrypt.compareSync(password, results[0].password)
      if (checkHash){
        res.json({
          msg: 'loginsuccess',
          email: results[0].email
        })
      } else {
        res.json({msg: 'badpassword'})
      }
    }
  })
})

router.post('/addTask', (req,res)=>{
  const email = req.body.email
  const selectQuery = `SELECT * FROM users WHERE email = $1`;
  db.query(selectQuery, [email]).then((results)=>{
    const uid = results[0].id
    const task = req.body.task
    const date = req.body.date
    const insertTaskQuery = `INSERT INTO task (uid, task, date) VALUES ($1, $2, $3)`;
    db.query(insertTaskQuery, [uid, task, date]).then(()=>{
      const getTaskQuery = `SELECT * FROM task WHERE uid = $1 ORDER BY date`;
      db.query(getTaskQuery, [uid]).then((getTaskResults)=>{
        res.json(getTaskResults)
      })
    })
  })
})

router.post('/getTask', (req,res)=>{
  const email = req.body.email
  const selectQuery = `SELECT * FROM users WHERE email = $1`;
  db.query(selectQuery, [email]).then((results)=>{
    const uid = results[0].id
    const getTaskQuery = `SELECT * FROM task WHERE uid = $1 ORDER BY date`;
      db.query(getTaskQuery, [uid]).then((getTaskResults)=>{
        res.json(getTaskResults)
      })
  })
})

router.post('/deleteTask', (req,res)=>{
  const id = req.body.id
  const deleteQuery = `DELETE FROM task WHERE id = $1`;
  db.query(deleteQuery, [id]).then(()=>{
    const uid = req.body.uid
    const getTaskQuery = `SELECT * FROM task WHERE uid = $1 ORDER BY date`;
      db.query(getTaskQuery, [uid]).then((getTaskResults)=>{
        res.json(getTaskResults)
      }) 
  })
})

router.get('/getTask/:id', (req,res)=>{
  const id = req.params.id
  console.log(id)
  const getTaskQuery = `SELECT * FROM task WHERE id = $1`;
  db.query(getTaskQuery, [id]).then((getTaskResults)=>{
    res.json(getTaskResults)
  })
})

router.post('/editTask', (req,res)=>{
  const id = req.body.id
  const task = req.body.task
  const date = req.body.date
  const email = req.body.email
  const editTaskQuery =  `UPDATE task SET task = $1, date = $2 WHERE id = $3`
  db.query(editTaskQuery, [task, date, id]).then(()=>{
    const selectQuery = `SELECT * FROM users WHERE email = $1`;
    db.query(selectQuery, [email]).then((results)=>{
      const uid = results[0].id
      const getTaskQuery = `SELECT * FROM task WHERE uid = $1 ORDER BY date`;
      db.query(getTaskQuery, [uid]).then((getTaskResults)=>{
        res.json(getTaskResults)
      })
    })
  })
})

module.exports = router;
