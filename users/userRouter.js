const express = require('express');
const users = require('./userDb')
const posts = require('../posts/postDb')
const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
  .then((user) =>{
    res.status(201).json(user)
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).json({
      message: "Error retrieving the user",
    })
  })
});
//DONE - Creates a new user

router.post('/:id/posts', validateUserId(), validatePost(),(req, res) => {
  posts.insert(req.body)
  .then((post)=>{
    res.status(201).json(post)
  })
  .catch((error)=>{
    console.log(error)
    res.status(500).json({
      message: "Error creating the posts",
    })
  })
});
//DONE - Creates a new post for a specified user

router.get('/', (req, res) => {
 users.get()
  .then((user)=>{
    res.status(200).json(user)
    })
 .catch((err)=>{
  console.log(err)
    res.status(500).json({
      message: "Error retrieving the users",
     })
  })
});
//DONE - Gets all users

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});
//DONE - Gets a single user by ID

router.get('/:id/posts', validateUserId(), (req, res) => {
  users.getUserPosts(req.params.id)
    .then((post)=>{
      res.status(200).json(post)
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({
        message: "Error retrieving the posts",
      })
    })
});
//DONE - Get all posts from a specific user id

router.delete('/:id', validateUserId(), (req, res) => {
 users.remove(req.params.id)
 .then((user)=>{
  res.status(200).json({
    message:"user destroyed"
  })
 })
 .catch((err)=>{
  console.log(err)
  res.status(500).json({
    message: "Error deleting the user",
  })
 })
});
//DONE - Deletes user by id

router.put('/:id',validateUser(), validateUserId(),  (req, res) => {
  users.update(req.params.id, req.body)
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).json({
      message: "Error deleting the user",
    })
  })
});
// DONE - updates user by id


//custom middleware
function validateUserId() {
return (req, res, next) =>{
  users.getById(req.params.id)
  .then((user)=>{
      if(user) {
        req.user = user
        next()
      } else{
        res.status(400).json({
          message:'invalid user id'
        })
      }
  })
  .catch(next)
  }
}

function validateUser(){
  return (req, res, next) => {
    if (!req.body){
      res.status(400).json({
        message:"missing user data"
      }) 
    } else if (!req.body.name){
      res.status(400).json({
        message:"missing required name field"
      })
    }
    next()
  }
}

function validatePost(){
  return (req, res, next) => {
    if (!req.body){
      res.status(400).json({
        message:"missing post data"
      })
    } else if (!req.body.text){
      res.status(400).json({
        message: "missing required text field"
      })
    }
    next()
  }
}

module.exports = router;
