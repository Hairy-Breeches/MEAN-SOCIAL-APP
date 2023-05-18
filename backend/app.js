const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/posts');

const postsRoutes = require("./routes/posts");

const app = express();
mongoose.connect('mongodb+srv://Hairy--Breeches:KTscpPR9KFTjPgQE@cluster0.cuylh78.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to database!')
})
.catch(() => {
  console.log('Connection failed to database!')
})


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", express.static(path.join(__dirname,"angular")));


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");

//   next();
// });

app.use("/api/posts", '/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(response => {
    res.status(200).json({
      message: 'successful posting!',
      id: response._id
    });

  }););

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular","index.html"));
});

// app.post('/api/posts', (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });

//   post.save();

//   console.log('post: ', post);


//   res.status(200).json({
//     message: 'successful posting!'
//   });
// })

// app.get('/api/posts', (req, res, next) => {
//   Post.find().then(documents => {
//     res.status(200).json({
//       message: 'Response from the server!',
//       posts: documents
//     });
//   })




// })

module.exports = app;
