const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/posts');

const postsRoutes = require("./routes/posts");

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://Hairy--Breeches:zt1tKUt2YEDEsuvA@cluster0.cuylh78.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to database!')
})
.catch(() => {
  console.log('Connection failed to database!')
})


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", express.static(path.join(__dirname,"angular")));

app.use("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(response => {
    res.status(200).json({
      message: 'successful posting!',
      id: response._id
    });

  })
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular","index.html"));
})

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {

  res.status(200).json({
    message: 'Response from the server!',
    posts: documents
  });

  })
})


module.exports = app;
