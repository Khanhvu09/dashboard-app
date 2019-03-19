var express = require('express');
var router = express.Router();
const db = require('../database')
const bcrypt = require('bcrypt-nodejs');


router.post('/signup', (req,res)=>{
  console.log(req.body)
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
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  const selectQuery = `SELECT * FROM users WHERE email = $1`;
  db.query(selectQuery,[email]).then((results)=>{
    console.log(results)
    if (results.length === 0){
      res.json({msg: 'baduser'})
    } else {
      const checkHash = bcrypt.compareSync(password, results[0].password)
      if (checkHash){
        res.json({msg: 'loginsuccess'})
      } else {
        res.json({msg: 'badpassword'})
      }
    }
  })
})

module.exports = router;
