const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/loginregis");
var db = mongoose.connection;
db.on('open', () => {
   console.log('Connected to the MongoDB database.')
})
db.on('error', (err) => {
   console.log(`Database error: ${err}`);
});