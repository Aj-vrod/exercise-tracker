const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_KEY);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// CREATE SCHEMAS
const exerciseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: String
  }
});
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  log: [exerciseSchema]
});
const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

// USERS' ROUTES
app.post('/api/users', (req, res) => {
  const newUsername = req.body.username;
  const newUser = new User({ username: newUsername});
  newUser.save((err, data) => {
    if (err) {
      console.error(err);
    }

  })
});








const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
