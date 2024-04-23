const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
  origin: 'https://<your-frontend-domain>.com' // Adjust this to your frontend's actual domain
}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter= require('./routes/comments')

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments',commentsRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
