const mongoose = require('mongoose');
const URI = 'mongodb+srv://admin:0881Digital!@interviewtest.bnk5t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 
// mongodb://localhost/mern-crud-test

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
