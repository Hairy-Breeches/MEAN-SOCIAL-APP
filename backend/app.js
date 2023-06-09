const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Hairy--Breeches:hTaPF0yL89lfELXr@cluster0.1tonzuh.mongodb.net/social-app?retryWrites=true&w=majority"
  )

  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed to database!");
  });


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/", express.static(path.join(__dirname,"angular")));

// app.post("/api/posts", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });

//   post.save().then(response => {
//     res.status(200).json({
//       message: 'successful posting!',
//       id: response._id
//     });

//   })
// })


app.use("/api/posts", postsRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular","index.html"));
})

// app.get('/api/posts', (req, res, next) => {
//   console.log('triggered!')
//   Post.find().then(documents => {

//   res.status(200).json({
//     message: 'Response from the server!',
//     posts: documents
//   });

//   }).catch(() => {
//     console.log('error in get')
//   })
// })


module.exports = app;
